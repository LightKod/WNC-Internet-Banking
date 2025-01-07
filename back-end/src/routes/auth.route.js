import express from 'express';
import {
    loginController,
    registerController,
    refreshTokenController,
    sendResetPasswordOtpController,
    verifyResetPasswordOtpController,
    resetPasswordController
} from '../controllers/auth.controller.js';
import { checkRole } from '../middleware/checkRole.js';
const router = express.Router();

router.post('/login', loginController);
router.post('/register',checkRole('employee'), registerController);
router.post('/refresh-token', refreshTokenController);
router.post('/send-otp', sendResetPasswordOtpController);
router.post('/verify-otp', verifyResetPasswordOtpController);
router.post('/reset-password', resetPasswordController);
export default router;
