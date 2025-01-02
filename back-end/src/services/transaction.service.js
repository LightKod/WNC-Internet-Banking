import db from '../models/index.model.js';
import { Op } from 'sequelize';

const { Transaction } = db;
const ITEMS_PER_PAGE = 5;

export const searchTransactions = async (filters) => {
    try {
        const { page = 1, query, from, to, bank, type } = filters;

        const whereClause = {};

        // Add content filter
        if (query) {
            whereClause.content = { [Op.like]: `%${query}%` };
        }

        // Add date range filter
        if (from || to) {
            whereClause.transaction_date = {};
            if (from) whereClause.transaction_date[Op.gte] = new Date(from);
            if (to) whereClause.transaction_date[Op.lte] = new Date(to);
        }

        // Add bank filter for external transactions
        if (bank) {
            whereClause[Op.and] = [
                { transaction_type: "external" }, // Only external transactions
                {
                    [Op.or]: [
                        { source_bank: { [Op.like]: `%${bank}%` } },
                        { destination_bank: { [Op.like]: `%${bank}%` } },
                    ],
                },
            ];
        }

        if (type) {
            whereClause.transaction_type = type;
        }

        const offset = (page - 1) * ITEMS_PER_PAGE;

        // Fetch transactions with pagination
        const transactions = await Transaction.findAll({
            where: whereClause,
            limit: ITEMS_PER_PAGE,
            offset,
            order: [["transaction_date", "DESC"]],
        });

        return transactions;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
};

export const getTotalPages = async (filters) => {
    try {
        const { query, from, to, bank, type } = filters;

        const whereClause = {};

        // Add content filter
        if (query) {
            whereClause.content = { [Op.like]: `%${query}%` };
        }

        // Add date range filter
        if (from || to) {
            whereClause.transaction_date = {};
            if (from) whereClause.transaction_date[Op.gte] = new Date(from);
            if (to) whereClause.transaction_date[Op.lte] = new Date(to);
        }

        // Add bank filter for external transactions
        if (bank) {
            whereClause[Op.and] = [
                { transaction_type: "external" }, // Only external transactions
                {
                    [Op.or]: [
                        { source_bank: { [Op.like]: `%${bank}%` } },
                        { destination_bank: { [Op.like]: `%${bank}%` } },
                    ],
                },
            ];
        }

        if (type) {
            whereClause.transaction_type = type;
        }

        // Count total transactions
        const totalCount = await Transaction.count({
            where: whereClause,
        });

        return Math.ceil(totalCount / ITEMS_PER_PAGE);
    } catch (error) {
        console.error("Error fetching total pages:", error);
        return 0;
    }
};