import transferService from '../services/transfer.service.js';
import { STATUS_SUCCESS, STATUS_ERROR } from '../utils/constants.js';

// Bước 1: Yêu cầu chuyển khoản và gửi OTP
export const initiateTransfer = async (req, res) => {
    const { source_account_number, destination_account_number, amount, content, fee_payer } = req.body;
    const User = req.user; // Lấy user_id từ JWT token
    try {
        // Khởi tạo giao dịch và gửi OTP
        const result = await transferService.initiateTransfer({
            source_account_number,
            destination_account_number,
            amount,
            content,
            fee_payer,
            user: User
        });

        if (result.status === STATUS_ERROR) {
            return res.status(200).json({ data:{}, message: result.message, status: STATUS_ERROR });
        }

        res.status(200).json({ data: result , message: result.message, status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error during transfer initiation:', err);
        res.status(500).json({ error: 'Failed to initiate transfer', status: STATUS_ERROR });
    }
};

// Bước 2: Xác nhận OTP và thực hiện chuyển khoản
export const confirmTransfer = async (req, res) => {
    const { otp_code,transaction_id } = req.body;

    try {
        // Xác nhận OTP và thực hiện chuyển khoản
        const result = await transferService.confirmTransfer({ otp_code, transaction_id: transaction_id });

        if (result.status === STATUS_ERROR) {
            return res.status(400).json({ message: result.message, status: STATUS_ERROR });
        }

        res.status(200).json({ message: 'Transfer completed successfully', status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error during transfer confirmation:', err);
        res.status(500).json({ error: 'Failed to complete transfer', status: STATUS_ERROR });
    }
};
export const initiateExternalTransfer = async (req, res) => {
    const { source_account_number, destination_account_number, amount, bank_code, content,fee_payer } = req.body;
    const user = req.user; // User authenticated from JWT middleware

    try {
        const result = await transferService.initiateExternalTransfer({
            source_account_number,
            destination_account_number,
            amount,
            bank_code,
            content,
            fee_payer,
            user,
        });

        if (result.status === STATUS_ERROR) {
            return res.status(400).json({ message: result.message, status: STATUS_ERROR });
        }

        res.status(200).json({ data: result.data, message: result.message, status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error during external transfer initiation:', err);
        res.status(500).json({ error: 'Failed to initiate external transfer', status: STATUS_ERROR });
    }
};

export const confirmExternalTransfer = async (req, res) => {
    const { otp_code, transaction_id, bank_code, signature } = req.body;

    try {
        const result = await transferService.confirmExternalTransfer({ otp_code, transaction_id, bank_code, signature });

        if (result.status === STATUS_ERROR) {
            return res.status(400).json({ message: result.message, status: STATUS_ERROR });
        }

        res.status(200).json({ message: result.message, status: STATUS_SUCCESS });
    } catch (err) {
        console.error('Error during external transfer confirmation:', err);
        res.status(500).json({ error: 'Failed to confirm external transfer', status: STATUS_ERROR });
    }
};

export default { initiateTransfer, confirmTransfer, initiateExternalTransfer, confirmExternalTransfer };
