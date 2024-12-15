import transferService from '../services/transfer.service.js';
import statusCode from '../constants/statusCode.js';
import { verifySignature, verifyRequestHash, generateSignature } from '../utils/security.js';
import db from '../models/index.model.js';
import bankConfig from '../config/bankConfig.js';

// Bước 1: Yêu cầu chuyển khoản và gửi OTP
export const initiateTransfer = async (req, res) => {
    const { source_account_number, destination_account_number, amount, content, fee_payer } = req.body;
    const User = req.user; // Lấy user_id từ JWT token
    try {
        // Khởi tạo giao dịch và gửi OTP
        const result = await transferService.initiateTransfer({
            source_account_number,
            destination_account_number,
            amount,
            content,
            fee_payer,
            user: User
        });

        if (result.status === statusCode.STATUS_ERROR) {
            return res.status(200).json({ data: {}, message: result.message, status: statusCode.STATUS_ERROR });
        }

        res.status(200).json({ data: result, message: result.message, status: statusCode.STATUS_SUCCESS });
    } catch (err) {
        console.error('Error during transfer initiation:', err);
        res.status(500).json({ error: 'Failed to initiate transfer', status: statusCode.STATUS_ERROR });
    }
};

// Bước 2: Xác nhận OTP và thực hiện chuyển khoản
export const confirmTransfer = async (req, res) => {
    const { otp_code, transaction_id } = req.body;

    try {
        // Xác nhận OTP và thực hiện chuyển khoản
        const result = await transferService.confirmTransfer({ otp_code, transaction_id: transaction_id });

        if (result.status === statusCode.STATUS_ERROR) {
            return res.status(400).json({ message: result.message, status: statusCode.STATUS_ERROR });
        }

        res.status(200).json({ message: 'Transfer completed successfully', status: statusCode.STATUS_SUCCESS });
    } catch (err) {
        console.error('Error during transfer confirmation:', err);
        res.status(500).json({ error: 'Failed to complete transfer', status: statusCode.STATUS_ERROR });
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

        if (result.status === statusCode.STATUS_ERROR) {
            return res.status(400).json({ message: result.message, status: statusCode.STATUS_ERROR });
        }

        res.status(200).json({ data: result.data, message: result.message, status: statusCode.STATUS_SUCCESS });
    } catch (err) {
        console.error('Error during external transfer initiation:', err);
        res.status(500).json({ error: 'Failed to initiate external transfer', status: statusCode.STATUS_ERROR });
    }
};

export const confirmExternalTransfer = async (req, res) => {
    const { otp_code, transaction_id, bank_code, signature } = req.body;

    try {
        const result = await transferService.confirmExternalTransfer({ otp_code, transaction_id, bank_code, signature });

        if (result.status === statusCode.STATUS_ERROR) {
            return res.status(400).json({ message: result.message, status: statusCode.STATUS_ERROR });
        }

        res.status(200).json({ message: result.message, status: statusCode.STATUS_SUCCESS });
    } catch (err) {
        console.error('Error during external transfer confirmation:', err);
        res.status(500).json({ error: 'Failed to confirm external transfer', status: statusCode.STATUS_ERROR });
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
        const signedResponse = generateSignature(responseData, linkedBank.private_key, bankConfig.SIGNATURE_TYPE);

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

        const isSignatureValid = await verifySignature(req.body, linkedBank.public_key, signature, linkedBank.encryption_type);
        if (!isSignatureValid) {
            return res.status(400).json({ error: 'Invalid signature' });
        }

        const account = await db.Account.findOne({ where: { account_number } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        account.balance += parseFloat(amount);
        await account.save();

        const responseData = { account_number, new_balance: account.balance, bank_code };
        const signedResponse = await generateSignature(responseData, linkedBank.private_key, bankConfig.SIGNATURE_TYPE);

        res.status(200).json({ ...responseData, signature: signedResponse });
    } catch (err) {
        console.error('Error in deposit API:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const linkBank = async (req, res) => {
    const { bank_code, bank_name, public_key, secret_key, encryption_type, api_base_url } = req.body;

    try {
        if (!bank_code || !bank_name || !public_key || !secret_key || !encryption_type || !api_base_url) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newBank = await db.LinkedBanks.create({
            bank_code,
            bank_name,
            public_key,
            secret_key,
            encryption_type,
            api_base_url,
        });

        res.status(201).json({ message: 'Bank linked successfully.', data: newBank });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Bank code must be unique.' });
        }
        res.status(500).json({ error: 'An error occurred while linking the bank.', details: error.message });
    }
};

export default { initiateTransfer, confirmTransfer, initiateExternalTransfer, confirmExternalTransfer, accountInfo, deposit, linkBank };
