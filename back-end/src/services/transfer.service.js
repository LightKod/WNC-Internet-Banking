
import db from '../models/index.model.js'
const { OTP, Transaction, Account, LinkedBanks, User, Debt } = db;
import statusCode from '../constants/statusCode.js';
import { generateRequestHash, generateSignature, verifyRequestHash, verifySignature } from '../utils/security.js'
import axios from 'axios';
import EmailService from './sendMail.service.js'; // Hàm gửi OTP qua email
import getExternalTransferTemplateByBankCode from '../middleware/allLinkedBank.js';
import { createDebtTransactionService, confirmDebtTransaction } from './debt.service.js';
const fee = 1000;

const ErrorCodes = {
    SUCCESS: { code: 0, message: "Success" },
    INVALID_OTP: { code: 1, message: "Invalid or expired OTP" },
    OTP_EXPIRED: { code: 2, message: "OTP has expired" },
    TRANSACTION_NOT_FOUND: { code: 3, message: "Transaction not found or already processed" },
    INSUFFICIENT_FUNDS: { code: 4, message: "Insufficient funds in source account" },
    ACCOUNT_NOT_FOUND: { code: 5, message: "Source or destination account not found" },
    BANK_NOT_LINKED: { code: 6, message: "Bank not linked" },
    INVALID_ACCOUNT: { code: 7, message: "Invalid account information" },
    INVALID_AMOUNT: { code: 8, message: "Invalid deposit amount" },
    DESTINATION_ACCOUNT_INVALID: { code: 9, message: "Invalid destination account" },
    API_ERROR: { code: 10, message: "Failed to process external API" },
    DEBT_NOT_FOUND: { code: 11, message: "Debt not found" },
    DEBT_USER_ERROR: { code: 12, message: "You are not the debtor of this debt" },
    DEBT_END: { code: 13, message: "Debt is paid or canceled" },
    DEBT_INSUFFICIENT: { code: 13, message: "Amount is not enough to pay debt" },
    UNKNOWN_ERROR: { code: 999, message: "An unknown error occurred" },
};
// Bước 1: Khởi tạo chuyển khoản và gửi OTP
export const initiateTransfer = async ({ source_account_number, destination_account_number, amount, content, fee_payer, user, debt_id }) => {
    try {
        // Truy xuất thông tin tài khoản nguồn và đích
        const sourceAccount = await Account.findOne({
            where: { account_number: source_account_number, user_id: user.id },
        });

        const destinationAccount = await Account.findOne({
            where: { account_number: destination_account_number },
        });


        // Kiểm tra điều kiện
        if (!sourceAccount || !destinationAccount) {
            return { status: statusCode.ERROR, ...ErrorCodes.INVALID_ACCOUNT };
        }
        let amountTransfer = Number(amount);
        if (fee_payer == "sender") {
            amountTransfer = amountTransfer + fee;
        }

        if (sourceAccount.balance < amountTransfer) {
            return { status: statusCode.ERROR, ...ErrorCodes.INSUFFICIENT_FUNDS };
        }

        if (debt_id) {
            const userAccount = sourceAccount;
            const debt = await Debt.findOne({
                where: { id: debt_id },
            });

            if (!debt) {
                return { status: statusCode.ERROR, ...ErrorCodes.DEBT_NOT_FOUND };
            }

            if (debt.debtor_account !== userAccount.account_number) {
                return { status: statusCode.ERROR, ...ErrorCodes.DEBT_USER_ERROR };
            }

            if (debt.status === 'PAID') {
                return { status: statusCode.ERROR, ...ErrorCodes.DEBT_END };
            }

            if (debt.status === 'CANCELED') {
                return { status: statusCode.ERROR, ...ErrorCodes.DEBT_END };
            }

            if (debt.amount > amount) {
                return { status: statusCode.ERROR, ...ErrorCodes.DEBT_INSUFFICIENT };
            }
        }

        const transactionType = debt_id ? 'debt-payment' : 'internal';

        // Tạo giao dịch mới
        const transaction = await Transaction.create({
            source_account: sourceAccount.account_number,
            destination_account: destinationAccount.account_number,
            amount,
            fee_payer,
            content,
            transaction_type: transactionType,
            source_bank: process.env.BANK_ID,
            destination_bank: process.env.BANK_ID,
        });

        if (debt_id) {
            await createDebtTransactionService(user.id, debt_id, transaction.id);
        }

        // Tạo OTP và liên kết với transaction_id
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo OTP ngẫu nhiên
        await OTP.create({
            transaction_id: transaction.id, // Liên kết với transaction_id thay vì user_id
            otp_code: otpCode,
            status: 'pending',
        });
        const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Transaction OTP</h2>
        <p>Dear ${user.name},</p>
        <p>You have initiated a transfer of <strong>${amount}</strong> to account <strong>${destination_account_number}</strong>.</p>
        <p>Please use the following OTP to confirm the transaction:</p>
        <div style="font-size: 18px; font-weight: bold; color: #000; padding: 10px; background: #f4f4f4; border: 1px solid #ddd; display: inline-block;">
          ${otpCode}
        </div>
        <p><strong>Note:</strong> This OTP is valid for 5 minutes only. If you did not request this code, please ignore this email or contact us for assistance.</p>
        <p>Best regards,</p>
        <p><strong>Bankit-PGP Support Team</strong></p>
        <p style="font-size: 12px; color: #555;">This is an automated email. Please do not reply to this message.</p>
      </div>
    `;
        // Gửi OTP qua email (giả sử đã có hàm gửi email OTP)
        console.log(`Đây là OTP: ${otpCode}`)
        //Đã test thành công không cần test nữa
        await EmailService({customerMail:user.email ,otpCode: otpCode,subject:"Email confirm OTP",content:emailContent});

        return { status: statusCode.SUCCESS, code: 0, data: transaction, message: 'Init transaction success' };
    } catch (err) {
        console.error('Error in initiate transfer service:', err);
        return { status: statusCode.ERROR, code: 999, message: err.message };
    }
};
export const confirmTransfer = async ({ otp_code, transaction_id, debt_id }) => {
    try {
        // Kiểm tra OTP
        const otpRecord = await OTP.findOne({
            where: { otp_code, status: "pending", transaction_id },
            order: [['created_at', 'DESC']], // Lấy OTP mới nhất
        });

        if (!otpRecord) {
            return { status: statusCode.ERROR, ...ErrorCodes.INVALID_OTP };
        }

        // Kiểm tra thời gian OTP còn hiệu lực (5 phút)
        const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 phút
        const otpCreatedAt = otpRecord.created_at.getTime();
        if (Date.now() - otpCreatedAt > OTP_EXPIRY_TIME) {
            otpRecord.status = 'expired';
            await otpRecord.save();
            return { status: statusCode.ERROR, ...ErrorCodes.OTP_EXPIRED };
        }

        // Tiến hành chuyển khoản nếu OTP hợp lệ
        const transaction = await Transaction.findOne({
            where: { id: parseInt(transaction_id), status: "PENDING" },
        });
        if (!transaction) {
            return { status: statusCode.ERROR, ...ErrorCodes.TRANSACTION_NOT_FOUND };
        }

        // Tiến hành cập nhật tài khoản nguồn và đích
        const sourceAccount = await Account.findOne({ where: { account_number: transaction.source_account } });
        const destinationAccount = await Account.findOne({ where: { account_number: transaction.destination_account } });

        if (!sourceAccount || !destinationAccount) {
            return { status: statusCode.ERROR, ...ErrorCodes.ACCOUNT_NOT_FOUND };
        }

        const receivedFee = transaction.fee_payer === 'receiver' ? fee : 0;
        const sendFee = transaction.fee_payer === 'sender' ? fee : 0;

        // Cập nhật số dư tài khoản
        await Account.update(
            { balance: parseInt(sourceAccount.balance) - parseInt(transaction.amount) - sendFee },
            { where: { id: sourceAccount.id } }
        );

        await Account.update(
            { balance: parseInt(destinationAccount.balance) + parseInt(transaction.amount) - receivedFee },
            { where: { id: destinationAccount.id } }
        );

        if (debt_id) {
            try {

                await confirmDebtTransaction(debt_id, transaction_id);
            } catch (err) {
                console.log("Debt payment error:", err);
            }
        }

        // Cập nhật trạng thái giao dịch
        transaction.status = "SUCCESS";
        await transaction.save();

        return { status: statusCode.SUCCESS, code: 0, message: 'Transfer completed successfully' };
    } catch (err) {
        console.error('Error in confirm transfer service:', err);
        return { status: statusCode.ERROR, code: 999, message: err.message };
    }
};
export const initiateExternalTransfer = async ({ source_account_number, destination_account_number, amount, bank_code, content, fee_payer, user }) => {
    try {
        const transferTemplate = getExternalTransferTemplateByBankCode(bank_code);
        // Validate linked bank
        const linkedBank = await LinkedBanks.findOne({ where: { bank_code } });
        if (!linkedBank) {
            return { status: statusCode.ERROR, ...ErrorCodes.BANK_NOT_LINKED };
        }


        // Retrieve source account
        const sourceAccount = await Account.findOne({ where: { account_number: source_account_number, user_id: user.id } });
        if (!sourceAccount) {
            return { status: statusCode.ERROR, ...ErrorCodes.ACCOUNT_NOT_FOUND };
        }
        if (sourceAccount.balance < amount) {
            return { status: statusCode.ERROR, ...ErrorCodes.INSUFFICIENT_FUNDS };
        }

        // Check destination account in linked bank
        const destinationCheckPayload = { bank_code: process.env.BANK_ID, account_number: destination_account_number, timestamp: Date.now() };
        const data = await transferTemplate.getUserAccount(destinationCheckPayload, linkedBank.account_info_api_url, linkedBank.secret_key);

        if (!data) {
            return { status: statusCode.ERROR, ...ErrorCodes.ACCOUNT_NOT_FOUND };
        }

        // Create transaction
        const transaction = await Transaction.create({
            source_account: sourceAccount.account_number,
            destination_account: destination_account_number,
            amount,
            fee_payer,
            content,
            source_bank: process.env.BANK_ID,
            destination_bank: bank_code,
            transaction_type: 'external',
        });
        console.log("Transaction created with ID:", transaction);

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.create({
            transaction_id: transaction.id,
            otp_code: otpCode,
            status: 'pending',
        });
        const emailContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>External Transfer OTP</h2>
        <p>Dear ${user.name},</p>
        <p>You have initiated a transfer of <strong>${amount}</strong> to account <strong>${destination_account_number}</strong> at bank <strong>${bank_code}</strong>.</p>
        <p>Please use the following OTP to confirm the transaction:</p>
        <div style="font-size: 18px; font-weight: bold; color: #000; padding: 10px; background: #f4f4f4; border: 1px solid #ddd; display: inline-block;">
          ${otpCode}
        </div>
        <p><strong>Note:</strong> This OTP is valid for 5 minutes only. If you did not request this code, please ignore this email or contact us for assistance.</p>
        <p>Best regards,</p>
        <p><strong>Bankit-PGP Support Team</strong></p>
        <p style="font-size: 12px; color: #555;">This is an automated email. Please do not reply to this message.</p>
      </div>
    `;
        console.log("OTP sent to email " + otpCode)
        await EmailService({customerMail:user.email ,otpCode: otpCode,subject:"Email confirm OTP",content:emailContent});
        return { status: statusCode.SUCCESS, code: 0, data: transaction, message: 'OTP sent to email' };
    } catch (err) {
        console.error('Error in initiateExternalTransfer service:', err);
        return { status: statusCode.ERROR, code: 999, message: err.message };
    }
};

export const confirmExternalTransfer = async ({ otp_code, transaction_id, bank_code }) => {
    try {
        const transferTemplate = getExternalTransferTemplateByBankCode(bank_code);
        // Validate linked bank
        const linkedBank = await LinkedBanks.findOne({ where: { bank_code } });
        if (!linkedBank) {
            return { status: statusCode.ERROR, ...ErrorCodes.BANK_NOT_LINKED };
        }

        // Validate OTP
        const otpRecord = await OTP.findOne({
            where: { otp_code, transaction_id, status: 'pending' },
        });
        if (!otpRecord) {
            return { status: statusCode.ERROR, ...ErrorCodes.INVALID_OTP };
        }
        const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 phút
        const otpCreatedAt = otpRecord.created_at.getTime();
        if (Date.now() - otpCreatedAt > OTP_EXPIRY_TIME) {
            otpRecord.status = 'expired';
            await otpRecord.save();
            return { status: statusCode.ERROR, ...ErrorCodes.OTP_EXPIRED };
        }

        // Retrieve transaction
        const transaction = await Transaction.findOne({ where: { id: transaction_id, status: 'PENDING' } });
        if (!transaction) {
            return { status: statusCode.ERROR, ...ErrorCodes.TRANSACTION_NOT_FOUND };
        }

        // Update source account balance
        const sourceAccount = await Account.findOne({ where: { account_number: transaction.source_account } });
        console.log("sourceAccount", sourceAccount)
        if (!sourceAccount || parseFloat(sourceAccount.balance) < parseFloat(transaction.amount)) {
            return { status: statusCode.ERROR, ...ErrorCodes.INSUFFICIENT_FUNDS };
        }



        // Call linked bank API to deposit into destination account
        const depositPayload = {
            bank_code: process.env.BANK_ID,
            source_account_number: sourceAccount.account_number,
            destination_account_number: transaction.destination_account,
            content: transaction.content,
            account_number: transaction.destination_account,
            amount: transaction.amount,
            timestamp: Date.now(),
        };

        const data = await transferTemplate.getTransferDepositBody(depositPayload, linkedBank.deposit_api_url, linkedBank.secret_key);
        sourceAccount.balance -= transaction.amount;
        await sourceAccount.save();
        // Mark transaction as completed
        transaction.status = 'SUCCESS';
        await transaction.save();

        // Mark OTP as used
        otpRecord.status = 'used';
        await otpRecord.save();

        return { status: statusCode.SUCCESS, code: 0, message: 'Transfer completed successfully' };
    } catch (err) {
        console.error('Error in confirmExternalTransfer service:', err);
        return { status: statusCode.ERROR, code: 999, message: err.message };
    }
};

export const depositInternal = async ({ infoType, accountInfo, amount }) => {
    try {
        let account;

        if (infoType === 'account') {
            // Tìm tài khoản dựa trên số tài khoản
            account = await Account.findOne({
                where: { account_number: accountInfo },
            });

            if (!account) {
                return { status: statusCode.ERROR, message: 'Account not found or unauthorized' };
            }
        } else if (infoType === 'username') {
            // Tìm người dùng dựa trên username
            const targetUser = await User.findOne({
                where: { username: accountInfo },
            });

            if (!targetUser) {
                return { status: statusCode.ERROR, message: 'No payment account found for this username' };
            }

            account = await Account.findOne({
                where: { user_id: targetUser.id, account_type: 'payment' },
            })

            if (!account) {
                return { status: statusCode.ERROR, message: 'No payment account found for this username' };
            }
        } else {
            return { status: statusCode.ERROR, message: 'Invalid infoType' };
        }

        // Kiểm tra số tiền nạp
        if (amount <= 0) {
            return { status: statusCode.ERROR, message: 'Invalid deposit amount' };
        }
        console.log(account);
        const balance = parseFloat(account.balance); // Chuyển đổi balance sang số
        const depositAmount = parseFloat(amount); // Chuyển đổi amount sang số

        account.balance = (balance + depositAmount).toFixed(2); // Làm tròn đến 2 chữ số thập phân
        await account.save();


        // Lưu thông tin giao dịch
        const transaction = await Transaction.create({
            source_account: null, // Không có tài khoản nguồn
            destination_account: account.account_number,
            amount,
            fee_payer: null,
            content: 'Internal deposit',
            transaction_type: 'internal-deposit',
            status: 'SUCCESS',
            source_bank: process.env.BANK_ID,
            destination_bank: process.env.BANK_ID
        });

        return { status: statusCode.SUCCESS, data: { account, transaction }, message: 'Deposit successful' };
    } catch (err) {
        console.error('Error in depositInternal service:', err);
        return { status: statusCode.ERROR, message: 'Failed to process deposit' };
    }
};
export default { depositInternal, initiateTransfer, confirmTransfer, initiateExternalTransfer, confirmExternalTransfer };
