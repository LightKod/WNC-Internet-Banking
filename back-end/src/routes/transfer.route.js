import express from 'express';
import transferController from '../controllers/transfer.controller.js';
import { verifySignature, verifyRequestHash, generateSignature } from '../utils/security.js';
import db from '../models/index.model.js';
import bankConfig from '../config/bankConfig.js';

const router = express.Router();

// Bước 1: Yêu cầu chuyển khoản và gửi OTP
router.post('/internal/initiate', transferController.initiateTransfer);

// Bước 2: Xác nhận OTP và thực hiện chuyển khoản
router.post('/internal/confirm', transferController.confirmTransfer);

router.post('/external/initiate', transferController.initiateExternalTransfer);

router.post('/external/confirm', transferController.confirmExternalTransfer);



router.post('/external/account-info', async (req, res) => {
    const { bank_code, account_number, timestamp, hash } = req.body;

    try {
        // Kiểm tra ngân hàng đối tác đã liên kết
        const linkedBank = await db.LinkedBanks.findOne({ where: { bank_code } });
        if (!linkedBank) {
            return res.status(403).json({ error: 'Bank not linked' });
        }

        // Kiểm tra yêu cầu có quá hạn không
        const REQUEST_EXPIRY_TIME = 5 * 60 * 1000; // 5 phút
        if (Date.now() - new Date(timestamp).getTime() > REQUEST_EXPIRY_TIME) {
            return res.status(400).json({ error: 'Request has expired' });
        }
        const payload = { bank_code, account_number, timestamp };

        // Kiểm tra hash tính toàn vẹn gói tin
        const isHashValid = verifyRequestHash(payload, linkedBank.secret_key, hash);
        if (!isHashValid) {
            return res.status(400).json({ error: 'Invalid request hash' });
        }

        // Lấy thông tin tài khoản
        const account = await db.Account.findOne({ where: { account_number } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        // Tạo phản hồi và ký bằng private key
        const responseData = { id: account.id, account_number: account.account_number, balance: account.balance, bank_code };
        const signedResponse = generateSignature(responseData, linkedBank.private_key, bankConfig.SIGNATURE_TYPE);

        res.status(200).json({ ...responseData, signature: signedResponse });
    } catch (err) {
        console.error('Error in account-info API:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/external/deposit', async (req, res) => {
    const { bank_code, account_number, amount, timestamp, signature, hash } = req.body;

    try {
        // Kiểm tra ngân hàng đối tác đã liên kết
        const linkedBank = await db.LinkedBanks.findOne({ where: { bank_code } });
        if (!linkedBank) {
            return res.status(403).json({ error: 'Bank not linked' });
        }

        // Kiểm tra yêu cầu có quá hạn không
        const REQUEST_EXPIRY_TIME = 5 * 60 * 1000; // 5 phút
        if (Date.now() - new Date(timestamp).getTime() > REQUEST_EXPIRY_TIME) {
            return res.status(400).json({ error: 'Request has expired' });
        }
        const payload = { bank_code, account_number, account, timestamp };

        // Kiểm tra hash tính toàn vẹn gói tin
        const isHashValid = verifyRequestHash(payload, linkedBank.secret_key, hash);
        if (!isHashValid) {
            return res.status(400).json({ error: 'Invalid request hash' });
        }

        // Kiểm tra chữ ký RSA/PGP
        const isSignatureValid = await verifySignature(req.body, linkedBank.public_key, signature, linkedBank.encryption_type);
        if (!isSignatureValid) {
            return res.status(400).json({ error: 'Invalid signature' });
        }

        // Cập nhật số dư tài khoản
        const account = await db.Account.findOne({ where: { account_number } });
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }

        account.balance += parseFloat(amount);
        await account.save();

        // Tạo phản hồi và ký bằng private key
        const responseData = { account_number, new_balance: account.balance, bank_code };
        const signedResponse = await generateSignature(responseData, linkedBank.private_key, bankConfig.SIGNATURE_TYPE);

        res.status(200).json({ ...responseData, signature: signedResponse });
    } catch (err) {
        console.error('Error in deposit API:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/external/link', async (req, res) => {
    const {
        bank_code,
        bank_name,
        public_key,
        secret_key,
        encryption_type,
        api_base_url,
    } = req.body;

    try {
        // Kiểm tra xem dữ liệu đã đủ hay chưa
        if (!bank_code || !bank_name || !public_key || !secret_key || !encryption_type || !api_base_url) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Tạo bản ghi mới
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
});
export default router;
