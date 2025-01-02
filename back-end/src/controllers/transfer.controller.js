import transferService from '../services/transfer.service.js';
import statusCode from '../constants/statusCode.js';
import { verifySignature, verifyRequestHash, generateSignature } from '../utils/security.js';
import { createDebtTransactionService, confirmDebtTransaction } from '../services/debt.service.js';
import db from '../models/index.model.js';
const { Transaction, DebtTransaction } = db;
// Bước 1: Yêu cầu chuyển khoản và gửi OTP
export const initiateTransfer = async (req, res) => {
    const { source_account_number, destination_account_number, amount, content, fee_payer, debt_id } = req.body;
    const User = req.user; // Lấy user_id từ JWT token
    try {
        // Khởi tạo giao dịch và gửi OTP
        const result = await transferService.initiateTransfer({
            source_account_number,
            destination_account_number,
            amount,
            content,
            fee_payer,
            user: User,
            debt_id
        });

        if (result.status === statusCode.ERROR) {
            return res.status(200).json({ data: {}, message: result.message, code: result.code, status: statusCode.ERROR });
        }

        res.status(200).json({ data: result, message: result.message, code: result.code, status: statusCode.SUCCESS });
    } catch (err) {
        console.error('Error during transfer initiation:', err);
        res.status(500).json({ error: 'Failed to initiate transfer', status: statusCode.ERROR });
    }
};

// Bước 2: Xác nhận OTP và thực hiện chuyển khoản
export const confirmTransfer = async (req, res) => {
    const { otp_code, transaction_id, debt_id } = req.body;

    try {
        // Xác nhận OTP và thực hiện chuyển khoản
        const result = await transferService.confirmTransfer({ otp_code, transaction_id: transaction_id });

        if (result.status === statusCode.ERROR) {
            return res.status(400).json({ message: result.message, code: result.code, status: statusCode.ERROR });
        }

        if (debt_id) {
            await confirmDebtTransaction(debt_id, transaction_id);
        }

        res.status(200).json({ message: 'Transfer completed successfully', code: result.code, status: statusCode.SUCCESS });
    } catch (err) {
        console.error('Error during transfer confirmation:', err);
        res.status(500).json({ error: 'Failed to complete transfer', status: statusCode.ERROR });
    }
};
export const initiateExternalTransfer = async (req, res) => {
    const { source_account_number, destination_account_number, amount, bank_code, content, fee_payer } = req.body;
    const user = req.user; // User authenticated from JWT middleware

    try {
        const result = await transferService.initiateExternalTransfer({
            source_account_number,
            destination_account_number,
            amount,
            bank_code,
            content,
            fee_payer,
            user,
        });
        if (result.status === statusCode.ERROR) {
            return res.status(400).json({ message: result.message, code: result.code, status: statusCode.ERROR });
        }

        res.status(200).json({ data: result.data, message: result.message, code: result.code, status: statusCode.SUCCESS });
    } catch (err) {
        console.error('Error during external transfer initiation:', err);
        res.status(500).json({ error: 'Failed to initiate external transfer', status: statusCode.ERROR });
    }
};

export const confirmExternalTransfer = async (req, res) => {
    const { otp_code, transaction_id, bank_code, signature } = req.body;

    try {
        const result = await transferService.confirmExternalTransfer({ otp_code, transaction_id, bank_code, signature });

        if (result.status === statusCode.ERROR) {
            return res.status(400).json({ message: result.message, code: result.code, status: statusCode.ERROR });
        }

        res.status(200).json({ message: result.message, code: result.code, status: statusCode.SUCCESS });
    } catch (err) {
        console.error('Error during external transfer confirmation:', err);
        res.status(500).json({ error: 'Failed to confirm external transfer', status: statusCode.ERROR });
    }
};


export const accountInfo = async (req, res) => {
    const { bank_code, account_number, timestamp, hash } = req.body;

    try {
        const linkedBank = await db.LinkedBanks.findOne({ where: { bank_code } });
        if (!linkedBank) {
            return res.status(403).json({ error: 'Bank not linked' });
        }

        const REQUEST_EXPIRY_TIME = 5 * 60 * 1000; // 5 phút
        if (Date.now() - new Date(timestamp).getTime() > REQUEST_EXPIRY_TIME) {
            return res.status(400).json({ error: 'Request has expired' });
        }

        const payload = { bank_code, account_number, timestamp };
        const isHashValid = verifyRequestHash(payload, linkedBank.secret_key, hash);
        if (!isHashValid) {
            return res.status(400).json({ error: 'Invalid request hash' });
        }

        const account = await db.Account.findOne({ where: { account_number } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const responseData = { id: account.id, account_number: account.account_number, balance: account.balance, bank_code };
        const signedResponse = await generateSignature(responseData, process.env.PRIVATE_KEY, process.env.SIGNATURE_TYPE);

        res.status(200).json({ ...responseData, signature: signedResponse });
    } catch (err) {
        console.error('Error in account-info API:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const deposit = async (req, res) => {
    const { bank_code, account_number, amount, timestamp, signature, hash } = req.body;

    try {
        const linkedBank = await db.LinkedBanks.findOne({ where: { bank_code } });
        if (!linkedBank) {
            return res.status(403).json({ error: 'Bank not linked' });
        }

        const REQUEST_EXPIRY_TIME = 5 * 60 * 1000; // 5 phút
        if (Date.now() - new Date(timestamp).getTime() > REQUEST_EXPIRY_TIME) {
            return res.status(400).json({ error: 'Request has expired' });
        }

        const payload = { bank_code, account_number, amount, timestamp };
        const isHashValid = verifyRequestHash(payload, linkedBank.secret_key, hash);
        if (!isHashValid) {
            return res.status(400).json({ error: 'Invalid request hash' });
        }

        const isSignatureValid = await verifySignature(payload, linkedBank.public_key, signature, linkedBank.encryption_type);
        if (!isSignatureValid) {
            return res.status(400).json({ error: 'Invalid signature' });
        }

        const account = await db.Account.findOne({ where: { account_number } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        const balance = parseFloat(account.balance); // Chuyển đổi balance sang số
        const depositAmount = parseFloat(amount); // Chuyển đổi amount sang số

        account.balance = (balance + depositAmount).toFixed(2); // Làm tròn đến 2 chữ số thập phân
        await account.save();
        const transaction = await Transaction.create({
            source_account: null, // Không có tài khoản nguồn
            destination_account: account.account_number,
            amount,
            fee_payer: null,
            content: 'Internal deposit',
            transaction_type: 'internal-deposit',
            status: 'SUCCESS',
            source_bank: bank_code,
        });
        const responseData = { account_number, new_balance: account.balance, bank_code };
        const signedResponse = await generateSignature(responseData, process.env.PRIVATE_KEY, process.env.SIGNATURE_TYPE);

        res.status(200).json({ ...responseData, signature: signedResponse });
    } catch (err) {
        console.error('Error in deposit API:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const linkBank = async (req, res) => {
    const { bank_code, bank_name, public_key, secret_key, encryption_type, account_info_api_url, deposit_api_url } = req.body;

    try {
        if (!bank_code || !bank_name || !public_key || !secret_key || !encryption_type || !account_info_api_url || !deposit_api_url) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newBank = await db.LinkedBanks.create({
            bank_code,
            bank_name,
            public_key,
            secret_key,
            encryption_type,
            account_info_api_url,
            deposit_api_url,
        });

        res.status(201).json({ message: 'Bank linked successfully.', data: newBank });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Bank code must be unique.' });
        }
        res.status(500).json({ error: 'An error occurred while linking the bank.', details: error.message });
    }
};
export const depositInternal = async (req, res) => {
    const { infoType, accountInfo, amount } = req.body;

    try {
        // Gọi service để thực hiện nạp tiền
        const result = await transferService.depositInternal({ infoType, accountInfo, amount });

        if (result.status === statusCode.ERROR) {
            return res.status(400).json({ message: result.message, status: statusCode.ERROR });
        }

        res.status(200).json({ data: result.data, message: result.message, status: statusCode.SUCCESS });
    } catch (err) {
        console.error('Error in depositInternal controller:', err);
        res.status(500).json({ error: 'Internal server error', status: statusCode.ERROR });
    }
};

export default { depositInternal, initiateTransfer, confirmTransfer, initiateExternalTransfer, confirmExternalTransfer, accountInfo, deposit, linkBank };
