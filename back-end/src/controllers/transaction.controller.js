import { searchTransactions } from '../services/transaction.service.js';
import statusCode from '../constants/statusCode.js';

export const searchTransactionsController = async (req, res) => {
    const { source_account, destination_account, status, transaction_type, date_from, date_to } = req.query;

    try {
        const filters = {
            source_account,
            destination_account,
            status,
            transaction_type,
            date_from,
            date_to,
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
