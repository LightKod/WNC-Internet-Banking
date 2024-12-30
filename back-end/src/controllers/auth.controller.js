import { z } from 'zod';
import {
    loginService,
    registerService,
    refreshTokenService,
    sendResetPasswordOtp,
    verifyResetPasswordOtp,
    resetPassword
} from '../services/auth.service.js';
import statusCode from '../constants/statusCode.js';

const registerSchema = z.object({
    username: z.string().min(3).max(50, "Username must be between 3 and 50 characters").nonempty("Username is required"),
    name: z.string().min(3).max(50, "Name must be between 3 and 50 characters").nonempty("Name is required"),
    password: z.string().min(8, "Password must be at least 8 characters long").nonempty("Password is required"),
    email: z.string().email("Invalid email format").nonempty("Email is required"),
    phone_number: z.string().regex(/^[0-9]{10,15}$/, "Phone number must be between 10 and 15 digits").nonempty("Phone number is required"),
});


// Login Controller
export const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await loginService(username, password, res);
        if (!data) {
            return res.status(401).json({ status: statusCode.ERROR, message: 'Invalid credentials' });
        }

        // res.cookie('refreshToken', data.refreshToken, { httpOnly: true });
        res.status(200).json({
            status: statusCode.SUCCESS,
            data: {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            },
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: statusCode.ERROR, message: 'Internal server error' });
    }
};

// Register Controller
export const registerController = async (req, res) => {
    const { username,name, password, email, phone_number } = req.body;

    try {
        const parsed = registerSchema.safeParse({ username,name, password, email, phone_number });

        if (!parsed.success) {
            return res.status(400).json({
                status: statusCode.ERROR,
                message: parsed.error.errors[0].message,
            });
        }

        const userId = await registerService(username,name, password, email, phone_number);

        res.status(201).json({
            status: statusCode.SUCCESS,
            data: { userId },
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ status: statusCode.ERROR, message: 'Internal server error' });
    }
};

// Refresh Token Controller
export const refreshTokenController = async (req, res) => {
    // const token = req.cookies.refreshToken;
    const token = req.body.refreshToken;

    if (!token) {
        return res.status(401).json({ status: statusCode.ERROR, message: 'Refresh token missing' });
    }

    try {
        const newAccessToken = await refreshTokenService(token);
        if (!newAccessToken) {
            return res.status(403).json({ status: statusCode.ERROR, message: 'Invalid refresh token' });
        }

        res.status(200).json({
            status: statusCode.SUCCESS,
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        console.error('Error during token refresh:', error);
        res.status(403).json({ status: statusCode.ERROR, message: 'Invalid refresh token' });
    }
};
export const sendResetPasswordOtpController = async (req, res) => {
    const { email } = req.body;

    try {
        const result = await sendResetPasswordOtp(email);

        if (result.success) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                data: result.data,
                message: 'OTP sent successfully to email.',
            });
        } else {
            res.status(200).json({
                status: statusCode.ERROR,
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Error in sendResetPasswordOtpController:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error.',
        });
    }
};

export const verifyResetPasswordOtpController = async (req, res) => {
    const { otp_code, email, otp_id } = req.body;

    try {
        const isValid = await verifyResetPasswordOtp(otp_code, email, otp_id);

        if (isValid) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                message: 'OTP verified successfully.',
            });
        } else {
            res.status(200).json({
                status: statusCode.ERROR,
                message: 'Invalid or expired OTP.',
            });
        }
    } catch (error) {
        console.error('Error in verifyResetPasswordOtpController:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error.',
        });
    }
};

export const resetPasswordController = async (req, res) => {
    const { otp_id, new_password } = req.body;

    try {
        const result = await resetPassword(otp_id, new_password);

        if (result.success) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                message: 'Password reset successfully.',
            });
        } else {
            res.status(200).json({
                status: statusCode.ERROR,
                message: result.message,
            });
        }
    } catch (error) {
        console.error('Error in resetPasswordController:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error.',
        });
    }
};