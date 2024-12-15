import db from "../models/index.model.js";
const { Account } = db;

export const getAccountsByUserIdService = async (userId) => {
    const accounts = await Account.findAll({
        where: { user_id: userId },
    });
    return accounts;
};


export const getPaymentAccountsByUserIdService = async (userId) => {
    const accounts = await Account.findOne({
        where: {
            user_id: userId,
            account_type: 'payment',
        },
    });
    return accounts;
};


export const createAccountService = async (userId) => {
    const lastAccount = await Account.findOne({
        order: [['account_number', 'DESC']],
    });

    const nextAccountNumber = lastAccount
        ? (Number(lastAccount.account_number) + 1).toString()
        : "1000000000000";

    // Create new account with the next account number
    const account = await Account.create({
        user_id: userId,
        account_number: nextAccountNumber,
        account_type: 'payment',
        balance: 1000000.0,
        currency: 'USD',
    });

    return account;
};