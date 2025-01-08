import db from '../models/index.model.js';
import { Op } from 'sequelize';

const { Transaction, Account } = db;
const ITEMS_PER_PAGE = 5;

export const searchTransactions = async (filters, user_id) => {
    try {
        const { page = 1, query, from, to, bank, type } = filters;
        const accounts = await Account.findAll({
            where: { user_id },
            attributes: ["account_number"],
        });

        const accountNumbers = accounts.map((account) => account.account_number);

        if (accountNumbers.length === 0) {
            // Nếu user không có tài khoản nào, trả về danh sách rỗng
            return [];
        }

        const whereClause = {};
        whereClause[Op.or] = [
            { source_account: { [Op.in]: accountNumbers } },
            { destination_account: { [Op.in]: accountNumbers } },
        ];
        // Add content filter
        if (query) {
            whereClause.content = { [Op.like]: `%${query}%` };
        }

        // Add date range filter
        if (from || to) {
            whereClause.transaction_date = {};
            if (from) whereClause.transaction_date[Op.gte] = new Date(from);
            if (to) whereClause.transaction_date[Op.lte] = new Date(to).setHours(23, 59, 59, 999);
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

export const getTotalPages = async (filters, user_id) => {
    try {
        const { query, from, to, bank, type } = filters
        const whereClause = {};
        const accounts = await Account.findAll({
            where: { user_id },
            attributes: ["account_number"],
        });
        const accountNumbers = accounts.map((account) => account.account_number);
        if (accountNumbers.length === 0) {
            // Nếu user không có tài khoản nào, trả về danh sách rỗng
            return 0;
        }
        whereClause[Op.or] = [
            { source_account: { [Op.in]: accountNumbers } },
            { destination_account: { [Op.in]: accountNumbers } },
        ];
        // Add content filter
        if (query) {
            whereClause.content = { [Op.like]: `%${query}%` };
        }

        // Add date range filter
        if (from || to) {
            whereClause.transaction_date = {};
            if (from) whereClause.transaction_date[Op.gte] = new Date(from);
            if (to) whereClause.transaction_date[Op.lte] = new Date(to).setHours(23, 59, 59, 999);
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
export const getAllTransactions = async (filters) => {
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
            if (to) whereClause.transaction_date[Op.lte] = new Date(to).setHours(23, 59, 59, 999);
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

        // Fetch total count for pagination
        const totalCount = await Transaction.count({ where: whereClause });
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

        // Fetch transactions with pagination
        const transactions = await Transaction.findAll({
            where: whereClause,
            limit: ITEMS_PER_PAGE,
            offset,
            order: [["transaction_date", "DESC"]],
        });

        return { transactions, totalPages };
    } catch (error) {
        console.error("Error fetching all transactions:", error);
        return { transactions: [], totalPages: 0 };
    }
};
