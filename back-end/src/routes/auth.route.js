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
import passport from 'passport';
const protectRoute = passport.authenticate('jwt', { session: false });

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization API
 */
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user and provide an access token and refresh token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username.
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     refreshToken:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       401:
 *         description: Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

router.post('/login', loginController);
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user in the system.
 *     tags:
 *       - Auth
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "jane_doe"
 *               name:
 *                 type: string
 *                 example: "Jane Doe"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               email:
 *                 type: string
 *                 example: "jane.doe@example.com"
 *               phone_number:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */

router.post('/register',protectRoute,checkRole('employee'), registerController);
/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Refresh access token
 *     description: Use the refresh token to obtain a new access token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: New access token generated successfully.
 *       401:
 *         description: Refresh token missing or invalid.
 *       403:
 *         description: Invalid refresh token.
 */
router.post('/refresh-token', refreshTokenController);
/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP for password reset
 *     description: Send an OTP to the user's email for password reset.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: OTP sent successfully.
 *       500:
 *         description: Internal server error.
 */

router.post('/send-otp', sendResetPasswordOtpController);
/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Verify the OTP sent to the user's email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp_code:
 *                 type: string
 *                 example: "123456"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               otp_id:
 *                 type: string
 *                 example: "otp123"
 *     responses:
 *       200:
 *         description: OTP verified successfully.
 *       400:
 *         description: Invalid or expired OTP.
 *       500:
 *         description: Internal server error.
 */

router.post('/verify-otp', verifyResetPasswordOtpController);
/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: Reset the user's password using a verified OTP.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp_id:
 *                 type: string
 *                 example: "otp123"
 *               new_password:
 *                 type: string
 *                 example: "newsecurepassword"
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/reset-password', resetPasswordController);
export default router;
