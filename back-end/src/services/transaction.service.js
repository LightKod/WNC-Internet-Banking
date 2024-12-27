import db from '../models/index.model.js';

const { Transaction } = db;

export const searchTransactions = async (filters) => {
    try {
        const { source_account, destination_account, status, transaction_type, date_from, date_to } = filters;

        const whereClause = {};

        if (source_account) whereClause.source_account = source_account;
        if (destination_account) whereClause.destination_account = destination_account;
        if (status) whereClause.status = status;
        if (transaction_type) whereClause.transaction_type = transaction_type;

        if (date_from || date_to) {
            whereClause.transaction_date = {};
            if (date_from) whereClause.transaction_date.$gte = new Date(date_from);
            if (date_to) whereClause.transaction_date.$lte = new Date(date_to);
        }

        const transactions = await Transaction.findAll({
            where: whereClause,
            attributes: [
                'id',
                'source_account',
                'destination_account',
                'amount',
                'transaction_type',
                'status',
                'transaction_date',
                'content',
                'remarks',
            ],
        });

        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};
