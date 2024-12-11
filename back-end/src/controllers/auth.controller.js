import {
    loginService,
    registerService,
    refreshTokenService
} from '../services/auth.service.js';

const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

// Login Controller
export const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await loginService(username, password, res);
        if (!data) {
            return res.status(401).json({ status: STATUS_ERROR, message: 'Invalid credentials' });
        }

        res.cookie('refreshToken', data.refreshToken, { httpOnly: true });
        res.status(200).json({
            status: STATUS_SUCCESS,
            data: {
                accessToken: data.accessToken,
            },
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: STATUS_ERROR, message: 'Internal server error' });
    }
};

// Register Controller
export const registerController = async (req, res) => {
    const { username, password, email, phone_number } = req.body;

    try {
        const userId = await registerService(username, password, email, phone_number);
        res.status(201).json({
            status: STATUS_SUCCESS,
            data: {
                userId,
            },
            message: 'User registered successfully',
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ status: STATUS_ERROR, message: 'Internal server error' });
    }
};

// Refresh Token Controller
export const refreshTokenController = async (req, res) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ status: STATUS_ERROR, message: 'Refresh token missing' });
    }

    try {
        const newAccessToken = await refreshTokenService(token);
        if (!newAccessToken) {
            return res.status(403).json({ status: STATUS_ERROR, message: 'Invalid refresh token' });
        }

        res.status(200).json({
            status: STATUS_SUCCESS,
            data: {
                accessToken: newAccessToken,
            },
        });
    } catch (error) {
        console.error('Error during token refresh:', error);
        res.status(403).json({ status: STATUS_ERROR, message: 'Invalid refresh token' });
    }
};
