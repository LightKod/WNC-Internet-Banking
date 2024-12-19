import db from '../models/index.model.js';
import { getPaymentAccountsByUserIdService } from './account.service.js';
const { Debt } = db;

// Service function to create a new debt
export const createDebtService = async (user, { debtor_account, amount, description = null, due_date = null }) => {
    const userAccount = await getPaymentAccountsByUserIdService(user.id);

    // Create a new debt entry in the database
    const newDebt = await Debt.create({
        creditor_account: userAccount.account_number,
        debtor_account,
        amount,
        description,
        due_date,
        status: 'PENDING',
    });

    return newDebt;
};


export const getDebtsByDebtorService = async (debtorAccount) => {
    const debts = await Debt.findAll({
        where: {
            debtor_account: debtorAccount,
        },
    });
    return debts;
};
