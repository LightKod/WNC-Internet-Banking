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
 * /api/debt:
 *   post:
 *     summary: Create a new debt
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               debtor_account:
 *                 type: string
 *                 description: The account number of the debtor.
 *                 example: "1000000001"
 *               amount:
 *                 type: number
 *                 description: The amount of the debt.
 *                 example: 1000
 *               description:
 *                 type: string
 *                 description: A description for the debt (optional).
 *                 example: "Loan repayment"
 *               due_date:
 *                 type: string
 *                 format: date
 *                 description: The due date for the debt in YYYY-MM-DD format.
 *                 example: "2025-01-15"
 *     responses:
 *       201:
 *         description: Debt created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Debt created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the created debt.
 *                       example: "12345"
 *                     debtor_account:
 *                       type: string
 *                       example: "1000000001"
 *                     amount:
 *                       type: number
 *                       example: 1000
 *                     description:
 *                       type: string
 *                       example: "Loan repayment"
 *                     due_date:
 *                       type: string
 *                       format: date
 *                       example: "2025-01-15"
 *                     creditor_account:
 *                       type: string
 *                       example: "2000000002"
 *       400:
 *         description: Validation error (e.g., invalid input data).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 errors:
 *                   type: string
 *                   description: A semicolon-separated string of validation errors.
 *                   example: "debtor_account - Invalid account format; amount - Must be greater than 0"
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post('/', createDebtController);
//router.get('/transactions', getAllDebtTransactionsController);
/**
 * @swagger
 * /api/debt/{debtId}:
 *   get:
 *     summary: Retrieve a debt by its ID
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: debtId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the debt to retrieve.
 *         example: "12345"
 *     responses:
 *       200:
 *         description: Debt fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Debt fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the debt.
 *                       example: "12345"
 *                     debtor_account:
 *                       type: string
 *                       example: "1000000001"
 *                     amount:
 *                       type: number
 *                       example: 1000
 *                     description:
 *                       type: string
 *                       example: "Loan repayment"
 *                     due_date:
 *                       type: string
 *                       format: date
 *                       example: "2025-01-15"
 *                     status:
 *                       type: string
 *                       description: The status of the debt (e.g., pending, paid).
 *                       example: "pending"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-01-01T12:00:00Z"
 *       400:
 *         description: Failed to fetch the debt (e.g., invalid ID or debt not found).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   description: Error message describing the issue.
 *                   example: "Debt not found"
 */
router.get('/:debtId', getDebtByIdController);
/**
 * @swagger
 * /api/user/debt/debtor:
 *   get:
 *     summary: Retrieve debts by debtor
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Debts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Debts retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique ID of the debt.
 *                         example: "12345"
 *                       debtor_account:
 *                         type: string
 *                         description: Debtor's account ID.
 *                         example: "1000000001"
 *                       amount:
 *                         type: number
 *                         description: Amount of the debt.
 *                         example: 500
 *                       description:
 *                         type: string
 *                         description: Description of the debt.
 *                         example: "Personal loan"
 *                       due_date:
 *                         type: string
 *                         format: date
 *                         description: Due date for the debt.
 *                         example: "2025-01-15"
 *                       status:
 *                         type: string
 *                         description: Status of the debt.
 *                         example: "unpaid"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp when the debt was created.
 *                         example: "2025-01-01T12:00:00Z"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/user/debtor', getDebtsByDebtorController);
/**
 * @swagger
 * /api/debt/user/creditor:
 *   get:
 *     summary: Retrieve debts by creditor
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Debts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Debts retrieved successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique ID of the debt.
 *                         example: "67890"
 *                       creditor_account:
 *                         type: string
 *                         description: Creditor's account ID.
 *                         example: "2000000001"
 *                       amount:
 *                         type: number
 *                         description: Amount of the debt.
 *                         example: 1000
 *                       description:
 *                         type: string
 *                         description: Description of the debt.
 *                         example: "Business loan"
 *                       due_date:
 *                         type: string
 *                         format: date
 *                         description: Due date for the debt.
 *                         example: "2025-01-30"
 *                       status:
 *                         type: string
 *                         description: Status of the debt.
 *                         example: "paid"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp when the debt was created.
 *                         example: "2025-01-10T12:00:00Z"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/user/creditor', getDebtByCreditorController);
/**
 * @swagger
 * /api/debt/read/{debtId}:
 *   patch:
 *     summary: Update the read status of a debt
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: debtId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the debt whose status is to be updated
 *         example: "12345"
 *     responses:
 *       200:
 *         description: Debt status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Debts status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the debt.
 *                       example: "12345"
 *                     status:
 *                       type: string
 *                       description: Updated status of the debt.
 *                       example: "read"
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the debt status was updated.
 *                       example: "2025-01-10T14:00:00Z"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.put('/read/:debtId', readDebtStatusController);
/**
 * @swagger
 * /api/debt/read-all:
 *   get:
 *     summary: Update the status of all debts from this user
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All debts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "All debts status updated successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique ID of the debt.
 *                         example: 1
 *                       amount:
 *                         type: number
 *                         format: float
 *                         description: Amount of the debt.
 *                         example: 100.50
 *                       due_date:
 *                         type: string
 *                         format: date
 *                         description: Due date for the debt.
 *                         example: "2025-01-01"
 *                       status:
 *                         type: string
 *                         description: Status of the debt.
 *                         example: "pending"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp when the debt was created.
 *                         example: "2025-01-10T12:00:00Z"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Error updating all debts status"
 */
router.put('/read-all', readAllDebtsController);
/**
 * @swagger
 * /api/debt/cancel:
 *   post:
 *     summary: Cancel a specific debt
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               debtId:
 *                 type: string
 *                 description: ID of the debt to be canceled.
 *                 example: "12345"
 *               cancelNote:
 *                 type: string
 *                 description: Reason for canceling the debt.
 *                 example: "Debt resolved by other means"
 *     responses:
 *       200:
 *         description: Debt canceled successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     debtId:
 *                       type: string
 *                       description: ID of the canceled debt.
 *                       example: "12345"
 *                     cancelNote:
 *                       type: string
 *                       description: Reason for canceling the debt.
 *                       example: "Debt resolved by other means"
 *       400:
 *         description: Bad request, possibly due to invalid debtId or cancelNote.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Invalid debtId or cancelNote"
 */
router.post('/cancel', cancelDebtController);

export default router;
