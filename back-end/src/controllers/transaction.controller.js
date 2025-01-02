import { searchTransactions, getTotalPages } from '../services/transaction.service.js';
import statusCode from '../constants/statusCode.js';

export const searchTransactionsController = async (req, res) => {
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

        const transactions = await searchTransactions(filters);
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

    try {
        const filters = { query, from, to, bank, type };
        const totalPages = await getTotalPages(filters);

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