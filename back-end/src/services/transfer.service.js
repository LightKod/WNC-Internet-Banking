
import db from '../models/index.model.js'
const { OTP, Transaction, Account, LinkedBanks, User } = db;
import statusCode from '../constants/statusCode.js';
import { generateRequestHash, generateSignature, verifyRequestHash, verifySignature } from '../utils/security.js'
import axios from 'axios';
import EmailService from './sendMail.service.js'; // Hàm gửi OTP qua email
import getExternalTransferTemplateByBankCode from '../middleware/allLinkedBank.js';

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
    UNKNOWN_ERROR: { code: 999, message: "An unknown error occurred" },
};
// Bước 1: Khởi tạo chuyển khoản và gửi OTP
export const initiateTransfer = async ({ source_account_number, destination_account_number, amount, content, fee_payer, user }) => {
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

        if (sourceAccount.balance < amount) {
            return { status: statusCode.ERROR, ...ErrorCodes.INSUFFICIENT_FUNDS };
        }

        // Tạo giao dịch mới
        const transaction = await Transaction.create({
            source_account: sourceAccount.account_number,
            destination_account: destinationAccount.account_number,
            amount,
            fee_payer,
            content,
            transaction_type: 'internal',
            source_bank: process.env.BANK_ID,
            destination_bank: process.env.BANK_ID,
        });

        // Tạo OTP và liên kết với transaction_id
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo OTP ngẫu nhiên
        await OTP.create({
            transaction_id: transaction.id, // Liên kết với transaction_id thay vì user_id
            otp_code: otpCode,
            status: 'pending',
        });

        // Gửi OTP qua email (giả sử đã có hàm gửi email OTP)
        console.log(`Đây là OTP: ${otpCode}`)
        //Đã test thành công không cần test nữa
        // await EmailService({customerMail:user.email ,otpCode: otpCode,subject:"Email confirm OTP"});

        return { status: statusCode.SUCCESS, code: 0, data: transaction, message: 'Init transaction success' };
    } catch (err) {
        console.error('Error in initiate transfer service:', err);
        return { status: statusCode.ERROR, code: 999, message: err.message };
    }
};
export const confirmTransfer = async ({ otp_code, transaction_id }) => {
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

        // Cập nhật số dư tài khoản
        await Account.update(
            { balance: parseInt(sourceAccount.balance) - parseInt(transaction.amount) },
            { where: { id: sourceAccount.id } }
        );

        await Account.update(
            { balance: parseInt(destinationAccount.balance) + parseInt(transaction.amount) },
            { where: { id: destinationAccount.id } }
        );

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
        const destinationHash = generateRequestHash(transferTemplate.getValidateHash({
            destinationCheckPayload, secret_key: linkedBank.secret_key
        }));

        const destinationCheckResponse = await axios.post(linkedBank.account_info_api_url, { //getUserAccountBody(payload)
            ...destinationCheckPayload,
            hash: destinationHash,
        });

        if (destinationCheckResponse.status !== 200 || !destinationCheckResponse.data) {
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
        console.log("OTP sent to email " + otpCode)
        // await EmailService({customerMail:user.email ,otpCode: otpCode,subject:"Email confirm OTP"});
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

        sourceAccount.balance -= transaction.amount;
        await sourceAccount.save();

        // Call linked bank API to deposit into destination account
        const depositPayload = {
            bank_code: process.env.BANK_ID,
            account_number: transaction.destination_account,
            amount: transaction.amount,
            timestamp: Date.now(),
        };

        const depositHash = generateRequestHash(depositPayload, linkedBank.secret_key); //transferTemplate.getValidateHash(payload)

        const depositSignature = await generateSignature(depositPayload, process.env.PRIVATE_KEY, process.env.SIGNATURE_TYPE); //transferTemplate.getValidateSignature(payload)
        console.log("depositSignature", depositSignature)
        const depositResponse = await axios.post(linkedBank.deposit_api_url, { //getTransferDepositBody(payload)
            ...depositPayload,
            hash: depositHash,
            signature: depositSignature,
        });

        if (depositResponse.status !== 200 || !depositResponse.data) {
            throw new Error('Failed to deposit into destination account');
        }

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
