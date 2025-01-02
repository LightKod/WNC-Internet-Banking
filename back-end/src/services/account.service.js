import db from "../models/index.model.js";
const { Account, User, LinkedBanks } = db;
import statusCode from "../constants/statusCode.js";
import getExternalTransferTemplateByBankCode from "../middleware/allLinkedBank.js";
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
        : "100000000000";

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
        attributes: ["username", "name"],
    });

    if (!user) {
        return null;
    }

    return {
        username: user.username,
        name: user.name,
        bank_name: process.env.BANK_NAME,
        bank_id: process.env.BANK_ID,
        account_number: account.account_number,
    };
};
export const getBankAccountByAccountNumber = async (bank_code, accountNumber) => {
    try {
        // Tìm tài khoản ngân hàng trong cơ sở dữ liệu
        const linkedBank = await LinkedBanks.findOne({ where: { bank_code } });
        if (!linkedBank) {
            return { status: statusCode.ERROR, message: 'Bank not linked' };
        }
        const destinationCheckPayload = { bank_code: process.env.BANK_ID, account_number: destination_account_number, timestamp: Date.now() };
        const bankConfig = getExternalTransferTemplateByBankCode(bank_code);
        
        const data = bankConfig.getUserAccount(destinationCheckPayload, linkedBank.account_info_api_url, linkedBank.secret_key);

        // Trả về thông tin tài khoản ngân hàng
        return {
            account_number: data.account_number,
            bank_name: linkedBank.bank_name,
            bank_code: data.bank_code,
            balance: data.balance,
        };
    } catch (error) {
        console.error("Error in getBankAccountByAccountNumber:", error);
        throw error; // Có thể xử lý thêm tùy theo yêu cầu
    }
};