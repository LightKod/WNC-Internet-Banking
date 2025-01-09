import express from 'express';
import {
    createDebtController,
    getDebtsByDebtorController,
    getDebtByCreditorController,
    readDebtStatusController,
    readAllDebtsController,
    getDebtByIdController,
    cancelDebtController,
    getAllDebtTransactionsController
} from '../controllers/debt.controller.js';

const router = express.Router();
/**
 * @swagger
 * /api/debt/transactions:
 *   get:
 *     summary: Get all debt transactions
 *     description: Retrieve all debt transactions for the logged-in user.
 *     tags:
 *       - Debt
 *     responses:
 *       200:
 *         description: Successfully retrieved debt transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       transactionId:
 *                         type: string
 *                         example: "txn123"
 *                       amount:
 *                         type: number
 *                         example: 1000
 *       400:
 *         description: Failed to fetch transactions.
 */
router.get('/transactions', getAllDebtTransactionsController);
/**
 * @swagger
 * /api/debt:
 *   post:
 *     summary: Create a new debt
 *     description: Create a new debt with the required details.
 *     tags:
 *       - Debt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               debtor_account:
 *                 type: string
 *                 description: The debtor's account number.
 *                 example: "123456789"
 *               amount:
 *                 type: number
 *                 description: The debt amount.
 *                 example: 1000
 *               description:
 *                 type: string
 *                 description: Description of the debt.
 *                 example: "Loan repayment"
 *               due_date:
 *                 type: string
 *                 format: date-time
 *                 description: Due date for the debt.
 *                 example: "2025-01-15T10:00:00Z"
 *     responses:
 *       201:
 *         description: Debt created successfully.
 *       400:
 *         description: Validation error.
 *       500:
 *         description: Internal server error.
 */
router.post('/', createDebtController);
/**
 * @swagger
 * /api/debt/{debtId}:
 *   get:
 *     summary: Get a debt by ID
 *     description: Retrieve details of a specific debt using its ID.
 *     tags:
 *       - Debt
 *     parameters:
 *       - in: path
 *         name: debtId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the debt.
 *     responses:
 *       200:
 *         description: Debt fetched successfully.
 *       400:
 *         description: Failed to fetch the debt.
 */
router.get('/:debtId', getDebtByIdController);
/**
 * @swagger
 * /api/debt/user/debtor:
 *   get:
 *     summary: Get debts by debtor
 *     description: Retrieve debts where the logged-in user is the debtor.
 *     tags:
 *       - Debt
 *     responses:
 *       200:
 *         description: Debts retrieved successfully.
 *       500:
 *         description: Internal server error.
 */

router.get('/user/debtor', getDebtsByDebtorController);
/**
 * @swagger
 * /api/debt/user/creditor:
 *   get:
 *     summary: Get debts by creditor
 *     description: Retrieve debts where the logged-in user is the creditor.
 *     tags:
 *       - Debt
 *     responses:
 *       200:
 *         description: Debts retrieved successfully.
 *       500:
 *         description: Internal server error.
 */

router.get('/user/creditor', getDebtByCreditorController);
/**
 * @swagger
 * /api/debt/read/{debtId}:
 *   put:
 *     summary: Mark a debt as read
 *     description: Update the status of a specific debt to "read".
 *     tags:
 *       - Debt
 *     parameters:
 *       - in: path
 *         name: debtId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the debt.
 *     responses:
 *       200:
 *         description: Debt status updated successfully.
 *       500:
 *         description: Internal server error.
 */
router.put('/read/:debtId', readDebtStatusController);
/**
 * @swagger
 * /api/debt/read-all:
 *   put:
 *     summary: Mark all debts as read
 *     description: Update the status of all debts for the logged-in user to "read".
 *     tags:
 *       - Debt
 *     responses:
 *       200:
 *         description: All debts status updated successfully.
 *       500:
 *         description: Internal server error.
 */
router.put('/read-all', readAllDebtsController);
/**
 * @swagger
 * /api/debt/cancel:
 *   post:
 *     summary: Cancel a debt
 *     description: Cancel a specific debt.
 *     tags:
 *       - Debt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               debtId:
 *                 type: string
 *                 description: The ID of the debt to cancel.
 *                 example: "debt123"
 *               cancelNote:
 *                 type: string
 *                 description: Reason for canceling the debt.
 *                 example: "Agreement canceled"
 *     responses:
 *       200:
 *         description: Debt canceled successfully.
 *       400:
 *         description: Failed to cancel the debt.
 */
router.post('/cancel', cancelDebtController);

export default router;
