import db from "../models/index.model.js";
const { Account, User } = db;
import bankinfo from '../config/bankConfig.js'

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


export const getUserDataByAccountNumberService = async (accountNumber) => {
    const account = await Account.findOne({
        where: { account_number: accountNumber },
    });

    if (!account) {
        return null;
    }

    const user = await User.findOne({
        where: { id: account.user_id },
        attributes: ["username"],
    });

    if (!user) {
        return null;
    }

    return {
        username: user.username,
        bank_name: bankinfo.BANK_NAME,
        bank_id: bankinfo.BANK_ID,
        account_number: account.account_number,
    };
};