import {
    createDebtService, getDebtsByDebtorService, getDebtByCreditorService,
    setDebtStatusToUnReadService, readDebtService, readAllDebtsService
} from '../services/debt.service.js';
import statusCode from '../constants/statusCode.js';
import { z } from "zod";

const createPaymentSchema = z.object({
    debtor_account: z.string().min(1, { message: "debtor_account is required" }),
    amount: z
        .number()
        .positive({ message: "Amount must be a positive number" }),
    description: z.string().optional(),
    due_date: z
        .string()
        .nonempty({ message: "due_date is required" }) // Ensure the string is not empty
        .refine(
            (dateString) => {
                const dueDate = new Date(dateString);
                return dueDate > new Date(); // Ensure due_date is in the future
            },
            { message: "due_date must be a future date" }
        ),
});

export const createDebtController = async (req, res) => {
    try {
        const user = req.user;

        const parsedBody = createPaymentSchema.parse(req.body);
        const { debtor_account, amount, description, due_date } = parsedBody;

        const newDebt = await createDebtService(user, {
            debtor_account,
            amount,
            description,
            due_date,
        });

        res.status(201).json({
            status: statusCode.SUCCESS,
            message: "Debt created successfully",
            data: newDebt,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorString = error.errors
                .map((err) => `${err.path.join('.')} - ${err.message}`)
                .join('; ');

            return res.status(400).json({
                status: statusCode.ERROR,
                errors: errorString,
            });
        }

        console.error("Unexpected error in createDebtController:", error);

        res.status(500).json({
            status: statusCode.ERROR,
            message: error.message,
        });
    }
};



export const getDebtsByDebtorController = async (req, res) => {
    const user_id = req.user.id;

    try {
        const debts = await getDebtsByDebtorService(user_id);
        await setDebtStatusToUnReadService(user_id);

        res.status(200).json({
            status: statusCode.SUCCESS,
            message: 'Debts retrieved successfully',
            data: debts,
        });
    } catch (error) {
        console.error('Error fetching debts:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error',
        });
    }
};


export const getDebtByCreditorController = async (req, res) => {
    try {
        const user_id = req.user.id;

        const debts = await getDebtByCreditorService(user_id);

        res.status(200).json({
            status: statusCode.SUCCESS,
            message: 'Debts retrieved successfully',
            data: debts,
        });
    } catch (error) {
        console.error('Error fetching debts:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error',
        });
    }
};

export const readDebtStatusController = async (req, res) => {
    try {
        const { debtId } = req.params;
        const debts = await readDebtService(debtId);

        res.status(200).json({
            status: statusCode.SUCCESS,
            message: 'Debts status updated successfully',
            data: debts,
        });
    } catch (error) {
        console.error('Error updating debt status:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: 'Internal server error',
        });
    }
};

export const readAllDebtsController = async (req, res) => {
    try {
        const user_id = req.user.id;

        const debts = await readAllDebtsService(user_id);

        res.status(200).json({
            status: statusCode.SUCCESS,
            message: 'All debts status updated successfully',
            data: debts,
        });
    } catch (error) {
        console.error('Error updating all debts status:', error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: error.message,
        });
    }
};