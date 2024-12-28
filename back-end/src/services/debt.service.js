import db from '../models/index.model.js';
import { getPaymentAccountsByUserIdService } from './account.service.js';
const { Debt, Account } = db;

export const createDebtService = async (user, { debtor_account, amount, description, due_date }) => {
    const userAccount = await getPaymentAccountsByUserIdService(user.id);

    if (!userAccount) {
        throw new Error('User account not found');
    }

    if (userAccount.account_number === debtor_account) {
        throw new Error('You cannot create a debt to yourself');
    }

    const debtorAccountExists = await Account.findOne({
        where: { account_number: debtor_account },
    });

    if (!debtorAccountExists) {
        throw new Error('Debtor account not found');
    }

    const newDebt = await Debt.create({
        creditor_account: userAccount.account_number,
        debtor_account,
        amount,
        description,
        due_date,
        status: 'NEW',
    });

    return newDebt;
};


export const getDebtsByDebtorService = async (user_id) => {
    const userAccount = await getPaymentAccountsByUserIdService(user_id);
    const debtorAccount = userAccount.account_number;
    const debts = await Debt.findAll({
        where: {
            debtor_account: debtorAccount,
        },
    });
    return debts;
};


export const getDebtByCreditorService = async (user_id) => {
    const userAccount = await getPaymentAccountsByUserIdService(user_id);
    const creditorAccount = userAccount.account_number;
    const debts = await Debt.findAll({
        where: {
            creditor_account: creditorAccount,
        },
    });
    return debts;
};

export const setDebtStatusToUnReadService = async (user_id) => {
    const userAccount = await getPaymentAccountsByUserIdService(user_id);
    const debtorAccount = userAccount.account_number;
    const debts = await Debt.update({
        status: 'UNREAD',
    }, {
        where: {
            debtor_account: debtorAccount,
            status: 'NEW',
        },
    });
    return debts;
}

export const readDebtService = async (debtId) => {
    const debts = await Debt.update({
        status: 'PENDING',
    }, {
        where: {
            id: debtId,
        },
    });
    return debts;
}

export const readAllDebtsService = async (user_id) => {
    const userAccount = await getPaymentAccountsByUserIdService(user_id);
    const debtorAccount = userAccount.account_number;
    const debts = await Debt.update({
        status: 'PENDING',
    }, {
        where: {
            debtor_account: debtorAccount,
            status: 'UNREAD',
        },
    });
    return debts;
}

export const getDebtByIdService = async (debtId) => {
    const debt = await Debt.findOne({
        where: { id: debtId },
    });

    if (!debt) {
        throw new Error("Debt not found");
    }

    return debt;
};


export const cancelDebtService = async (userId, debtId, cancelNote) => {
    const userAccount = await getPaymentAccountsByUserIdService(userId);

    if (!userAccount) {
        throw new Error('User account not found');
    }
    const debt = await Debt.findOne({
        where: { id: debtId },
    });
    if (!debt) {
        throw new Error('Debt not found');
    }

    if (debt.creditor_account !== userAccount.account_number && debt.debtor_account !== userAccount.account_number) {
        throw new Error('You are not authorized to cancel this debt');
    }

    if (debt.status === 'PAID') {
        throw new Error('Paid debts cannot be canceled');
    }

    if (debt.status === 'CANCELED') {
        throw new Error('This debt is already canceled');
    }

    // Update debt status to 'CANCELED' and add the cancel note
    await debt.update({
        status: 'CANCELED',
        cancel_note: cancelNote,
    });

    return debt;
};
