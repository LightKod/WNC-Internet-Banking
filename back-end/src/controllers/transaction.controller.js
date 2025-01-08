import { getAllTransactions, searchTransactions, getTotalPages } from '../services/transaction.service.js';
import statusCode from '../constants/statusCode.js';

export const searchTransactionsController = async (req, res) => {
    const { page = 1, query = '', from, to, bank, type } = req.query;
    const user_id = req.user.id;
    try {
        const filters = {
            page: parseInt(page, 10),
            query,
            from,
            to,
            bank,
            type,
        };

        const transactions = await searchTransactions(filters, user_id);
        res.status(200).json({
            status: statusCode.SUCCESS,
            data: { transactions },
        });

    } catch (error) {
        console.error('Error in searchTransactionsController:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error',
        });
    }
};

export const getTotalPagesController = async (req, res) => {
    const { query = '', from, to, bank, type } = req.query;
    const user_id = req.user.id;
    try {
        const filters = { query, from, to, bank, type };
        const totalPages = await getTotalPages(filters, user_id);

        res.status(200).json({
            status: statusCode.SUCCESS,
            data: { totalPages },
        });
    } catch (error) {
        console.error('Error in getTotalPagesController:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error',
        });
    }
};
export const getAllTransactionsController = async (req, res) => {
    const { page = 1, query = '', from, to, bank, type } = req.query;
    try {
        const filters = {
            page: parseInt(page, 10),
            query,
            from,
            to,
            bank,
            type,
        };

        const { transactions, totalPages } = await getAllTransactions(filters);

        res.status(200).json({
            status: statusCode.SUCCESS,
            data: {
                transactions,
                totalPages,
            },
        });
    } catch (error) {
        console.error('Error in getAllTransactionsController:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error',
        });
    }
};
