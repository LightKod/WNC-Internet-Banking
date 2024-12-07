import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index.model.js'

const { User, Account, RefreshToken } = db;

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
export const registerService = async (username, password, email, phone_number) => {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        password: hashedPassword,
        email,
        phone_number,
    });

    await Account.create({
        account_number: `ACC-${newUser.id}`,
        account_type: 'payment',
        balance: 1000,
        currency: 'USD',
        user_id: newUser.id,
    });

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
