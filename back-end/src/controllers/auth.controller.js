import { z } from 'zod';
import {
    loginService,
    registerService,
    refreshTokenService
} from '../services/auth.service.js';
import statusCode from '../constants/statusCode.js';

const registerSchema = z.object({
    username: z.string().min(3).max(50, "Username must be between 3 and 50 characters").nonempty("Username is required"),
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

        res.cookie('refreshToken', data.refreshToken, { httpOnly: true });
        res.status(200).json({
            status: statusCode.SUCCESS,
            data: {
                accessToken: data.accessToken,
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
    const { username, password, email, phone_number } = req.body;

    try {
        const parsed = registerSchema.safeParse({ username, password, email, phone_number });

        if (!parsed.success) {
            return res.status(400).json({
                status: statusCode.ERROR,
                message: parsed.error.errors[0].message,
            });
        }

        const userId = await registerService(username, password, email, phone_number);

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
    const token = req.cookies.refreshToken;

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
