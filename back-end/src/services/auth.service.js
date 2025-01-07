import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index.model.js'
import { createAccountService } from './account.service.js'
import { Op } from 'sequelize';
const { User, Account, RefreshToken, OTP } = db;
import EmailService from './sendMail.service.js';
// Generate JWT tokens
const generateAccessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
const generateRefreshToken = (user) => jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

// Store refresh token in the database
const storeRefreshToken = async (userId, token, expiresAt) => {
    await RefreshToken.create({
        user_id: userId,
        token,
        expires_at: expiresAt,
    });
};

// Login Service
export const loginService = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null; // Invalid credentials
    }

    const accessToken = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken({ id: user.id, username: user.username });
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await storeRefreshToken(user.id, refreshToken, refreshTokenExpiry);

    return { accessToken, refreshToken };
};

// Register Service
export const registerService = async (username, name, password, email, phone_number) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        name,
        phone_number,
    });

    await createAccountService(newUser.id)

    return newUser.id;
};

// Refresh Token Service
export const refreshTokenService = async (token) => {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const userId = payload.id;

    const storedToken = await RefreshToken.findOne({
        where: { user_id: userId, token },
    });

    if (!storedToken) {
        return null; // Invalid token
    }

    return generateAccessToken({ id: userId });
};
const OTP_EXPIRATION_TIME = 10 * 60 * 1000; // 10 minutes

export const sendResetPasswordOtp = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return { success: false, message: 'Email not found.' };
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const otp = await OTP.create({
        user_id: user.id,
        purpose: 'reset_password',
        otp_code: otpCode,
    });

    // Send OTP via email (implement email service here)
    console.log(`Send OTP: ${otpCode} to ${email}`);
    const content = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Your Reset Password OTP</h2>
      <p>Dear ${user.name},</p>
      <p>Please use the following OTP to reset your password:</p>
      <div style="font-size: 18px; font-weight: bold; color: #000; padding: 10px; background: #f4f4f4; border: 1px solid #ddd; display: inline-block;">
        ${otpCode}
      </div>
    <p><strong>Note:</strong> This OTP is valid for 5 minutes only. If you did not request this code, please ignore this email or contact us for assistance.</p>
    <p>Best regards,</p>
    <p><strong>Bankit-PGP Support Team</strong></p>
    <p style="font-size: 12px; color: #555;">This is an automated email. Please do not reply to this message.</p>
    </div>
  `;
    await EmailService({ customerMail: email, otpCode: otpCode, subject: 'Reset Password OTP' ,content: content });

    return { success: true, data: otp.id };
};

export const verifyResetPasswordOtp = async (otp_code, email, otp_id) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return { success: false, message: 'Email not found.' };
    }
    const otp = await OTP.findOne({
        where: {
            id: otp_id,
            otp_code,
            purpose: 'reset_password',
            status: 'pending',
            user_id: user.id,
            created_at: {
                [Op.gte]: new Date(Date.now() - OTP_EXPIRATION_TIME), // OTP được tạo trong vòng 10 phút trước
            },
        },
    });

    if (!otp) {
        return false;
    }

    await otp.update({ status: 'confirmed' });
    return true;
};

export const resetPassword = async (otp_id, new_password) => {
    const otp = await OTP.findOne({
        where: {
            id: otp_id,
            purpose: 'reset_password',
            status: 'confirmed',
        },
    });

    if (!otp) {
        return { success: false, message: 'Invalid or expired OTP.' };
    }

    const user = await User.findOne({ where: { id: otp.user_id } });

    if (!user) {
        return { success: false, message: 'User not found.' };
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await user.update({ password: hashedPassword });
    await otp.update({ status: 'used' });

    return { success: true };
};