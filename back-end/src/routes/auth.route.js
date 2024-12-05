import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models/index.model.js'; // Đường dẫn đến tệp Sequelize models

const User = db.User;
const refreshToken = db.RefreshToken;
const router = express.Router();
// Định nghĩa các hằng số trạng thái
const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

// Function to generate an access token
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

// Function to generate a refresh token
function generaterefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}
async function storerefreshToken(userId, token, expiresAt) {
    try {
        await refreshToken.create({
            user_id: userId,
            token,
            expires_at: expiresAt,
        });
        console.log('Refresh token stored successfully');
    } catch (err) {
        console.error('Error storing refresh token:', err);
        throw new Error('Failed to store refresh token');
    }
}
// Đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Tìm người dùng theo tên đăng nhập
        const user = await User.findOne({ where: { username } });
        
        // Kiểm tra người dùng có tồn tại và xác thực mật khẩu
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ status: STATUS_ERROR, message: 'Invalid credentials' });
        }

        // Tạo access token và refresh token
        const accessToken = generateAccessToken({ id: user.id, username: user.username });
        const refreshToken = generaterefreshToken({ id: user.id, username: user.username });
        const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 ngày

        // Lưu refresh token vào cơ sở dữ liệu
        await storerefreshToken(user.id, refreshToken, refreshTokenExpiry);

        // Gửi cookie chứa refresh token
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        // Trả về access token và trạng thái
        res.status(200).json({ status: STATUS_SUCCESS, accessToken, message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: STATUS_ERROR, message: 'Internal server error' });
    }
});
// Đăng ký
router.post('/register', async (req, res) => {
    const { username, password, email,phone_number } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại hay chưa
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ status: STATUS_ERROR, message: 'Username already exists' });
        }

        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = await User.create({
            username,
            password: hashedPassword,
            email,
            phone_number
        });

        res.status(201).json({ status: STATUS_SUCCESS, message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ status: STATUS_ERROR, message: 'Internal server error' });
    }
});

// Route làm mới token
router.post('/refresh-token', async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // Lấy refresh token từ cookie

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token không hợp lệ' });
    }

    try {
        // Xác thực refresh token
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = payload.id;

        // Kiểm tra xem refresh token có trong cơ sở dữ liệu không
        const storedToken = await refreshToken.findOne({
            where: { user_id: userId, token: refreshToken },
        });
        if (!storedToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        // Tạo access token mới
        const newAccessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

        // Trả về access token mới
        return res.status(200).json({ accessToken: newAccessToken , status: STATUS_SUCCESS});
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: 'Invalid refresh token' , status: STATUS_ERROR});
    }
});

export default router;