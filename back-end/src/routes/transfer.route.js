import express from 'express';
import transferController from '../controllers/transfer.controller.js';

const router = express.Router();

// Bước 1: Yêu cầu chuyển khoản và gửi OTP
router.post('/internal/initiate', transferController.initiateTransfer);

// Bước 2: Xác nhận OTP và thực hiện chuyển khoản
router.post('/internal/confirm', transferController.confirmTransfer);

export default router;
