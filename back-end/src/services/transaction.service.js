import db from '../models/index.model.js';
import { Op } from 'sequelize';

const { Transaction } = db;
const ITEMS_PER_PAGE = 5;

export const searchTransactions = async (filters) => {
    try {
        const { page, query, from, to } = filters;

        const whereClause = {};

        if (query) {
            whereClause.content = { [Op.like]: `%${query}%` };
        }

        if (from || to) {
            whereClause.transaction_date = {};
            if (from) whereClause.transaction_date[Op.gte] = new Date(from);
            if (to) whereClause.transaction_date[Op.lte] = new Date(to);
        }

        const offset = (page - 1) * ITEMS_PER_PAGE;

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
            limit: ITEMS_PER_PAGE,
            offset,
            order: [['transaction_date', 'DESC']],
        });

        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};

export const getTotalPages = async (filters) => {
    try {
        const { query, from, to } = filters;

        const whereClause = {};

        if (query) {
            whereClause.content = { [Op.like]: `%${query}%` };
        }

        if (from || to) {
            whereClause.transaction_date = {};
            if (from) whereClause.transaction_date[Op.gte] = new Date(from);
            if (to) whereClause.transaction_date[Op.lte] = new Date(to);
        }

        const totalCount = await Transaction.count({
            where: whereClause,
        });

        return Math.ceil(totalCount / ITEMS_PER_PAGE);
    } catch (error) {
        console.error('Error fetching total pages:', error);
        return 0;
    }
};