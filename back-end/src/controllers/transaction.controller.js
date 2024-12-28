import { searchTransactions,getTotalPages  } from '../services/transaction.service.js';
import statusCode from '../constants/statusCode.js';

export const searchTransactionsController = async (req, res) => {
    const { page = 1, query = '', from, to } = req.query;

    try {
        const filters = {
            page: parseInt(page, 10),
            query,
            from,
            to,
        };

        const transactions = await searchTransactions(filters);

        if (transactions.length > 0) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                data: { transactions },
            });
        } else {
            res.status(404).json({
                status: statusCode.ERROR,
                message: 'No transactions found',
            });
        }
    } catch (error) {
        console.error('Error in searchTransactionsController:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error',
        });
    }
};

export const getTotalPagesController = async (req, res) => {
    const { query = '', from, to } = req.query;

    try {
        const filters = { query, from, to };
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