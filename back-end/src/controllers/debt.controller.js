import { createDebtService, getDebtsByDebtorService } from '../services/debt.service.js';

const STATUS_SUCCESS = 0;
const STATUS_ERROR = -1;

export const createDebtController = async (req, res) => {
    try {
        const user = req.user;
        const { debtor_account, amount, description, due_date } = req.body;
        // Call the service with destructured values
        const newDebt = await createDebtService(user, {
            debtor_account,
            amount,
            description,
            due_date
        });

        res.status(201).json({
            status: STATUS_SUCCESS,
            message: 'Debt created successfully',
            data: { newDebt },
        });
    } catch (error) {
        console.error('Error creating debt:', error);
        res.status(500).json({
            status: STATUS_ERROR,
            message: 'Failed to create debt',
        });
    }
};


export const getDebtsByDebtorController = async (req, res) => {
    const { debtorAccount } = req.params;

    try {
        const debts = await getDebtsByDebtorService(debtorAccount);

        if (!debts.length) {
            return res.status(404).json({
                status: STATUS_ERROR,
                message: 'No debts found for this account',
            });
        }

        res.status(200).json({
            status: STATUS_SUCCESS,
            message: 'Debts retrieved successfully',
            debts,
        });
    } catch (error) {
        console.error('Error fetching debts:', error);
        res.status(500).json({
            status: STATUS_ERROR,
            message: 'Internal server error',
        });
    }
};