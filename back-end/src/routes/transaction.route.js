import express from 'express';
import { getAllTransactionsController,searchTransactionsController,getTotalPagesController } from '../controllers/transaction.controller.js';
const router = express.Router();

// Endpoint for searching transactions
/**
 * @swagger
 * /api/transaction/admin:
 *   get:
 *     summary: Retrieve list of transactions (admin)
 *     description: This endpoint allows admin to get a list of transactions with custom parameter such as page, query, date range, bank's id and transaction type.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *           example: "transaction123"
 *         description: A query string to filter transactions based on their contents.
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         description: The start date for the transaction filter in YYYY-MM-DD format.
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-31"
 *         description: The end date for the transaction filter in YYYY-MM-DD format.
 *       - in: query
 *         name: bank
 *         schema:
 *           type: string
 *           example: "RSA"
 *         description: The code of the linked bank.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ["internal", "external", "debt-payment", "internal-deposit"]
 *           example: "internal"
 *         description: The type of transaction.
 *     responses:
 *       200:
 *         description: Successful retrieval of transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status (0 for SUCCESS, -1 for ERROR).
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           source_account:
 *                             type: string
 *                             example: "123456789012"
 *                           destination_account:
 *                             type: string
 *                             example: "098765432109"
 *                           amount:
 *                             type: number
 *                             format: decimal
 *                             example: 1000.50
 *                           transaction_type:
 *                             type: string
 *                             enum: ["internal", "external", "debt-payment", "internal-deposit"]
 *                             example: "internal"
 *                           fee_payer:
 *                             type: string
 *                             enum: ["sender", "receiver"]
 *                             example: "sender"
 *                           content:
 *                             type: string
 *                             example: "Payment for invoice #1234"
 *                           status:
 *                             type: string
 *                             enum: ["PENDING", "SUCCESS", "FAILED"]
 *                             example: "SUCCESS"
 *                           transaction_date:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-01-09T10:30:00Z"
 *                           source_bank:
 *                             type: string
 *                             example: "RSA"
 *                           destination_bank:
 *                             type: string
 *                             example: "RSA"
 *                           remarks:
 *                             type: string
 *                             example: "Processed without issues"
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error during the account information retrieval process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status (0 for SUCCESS, -1 for ERROR).
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/admin', getAllTransactionsController);


/**
 * @swagger
 * /api/transaction/search:
 *   get:
 *     summary: Retrieve list of transactions (user)
 *     description: This endpoint allows user to get their own list of transactions with custom parameter such as page, query, date range, bank's id and transaction type.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *           example: "transaction123"
 *         description: A query string to filter transactions based on their contents.
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         description: The start date for the transaction filter in YYYY-MM-DD format.
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-31"
 *         description: The end date for the transaction filter in YYYY-MM-DD format.
 *       - in: query
 *         name: bank
 *         schema:
 *           type: string
 *           example: "RSA"
 *         description: The code of the linked bank.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ["internal", "external", "debt-payment", "internal-deposit"]
 *           example: "internal"
 *         description: The type of transaction.
 *     responses:
 *       200:
 *         description: Successful retrieval of transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status (0 for SUCCESS, -1 for ERROR).
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           source_account:
 *                             type: string
 *                             example: "123456789012"
 *                           destination_account:
 *                             type: string
 *                             example: "098765432109"
 *                           amount:
 *                             type: number
 *                             format: decimal
 *                             example: 1000.50
 *                           transaction_type:
 *                             type: string
 *                             enum: ["internal", "external", "debt-payment", "internal-deposit"]
 *                             example: "internal"
 *                           fee_payer:
 *                             type: string
 *                             enum: ["sender", "receiver"]
 *                             example: "sender"
 *                           content:
 *                             type: string
 *                             example: "Payment for invoice #1234"
 *                           status:
 *                             type: string
 *                             enum: ["PENDING", "SUCCESS", "FAILED"]
 *                             example: "SUCCESS"
 *                           transaction_date:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-01-09T10:30:00Z"
 *                           source_bank:
 *                             type: string
 *                             example: "RSA"
 *                           destination_bank:
 *                             type: string
 *                             example: "RSA"
 *                           remarks:
 *                             type: string
 *                             example: "Processed without issues"
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error during the account information retrieval process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status (0 for SUCCESS, -1 for ERROR).
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/search', searchTransactionsController);


/**
 * @swagger
 * /api/transaction/pages:
 *   get:
 *     summary: Retrieve the total transaction page number (user)
 *     description: This endpoint allows user to get the total number of transactions pages with custom parameter such as page, query, date range, bank's id and transaction type.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *           example: "transaction123"
 *         description: A query string to filter transactions based on their contents.
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-01"
 *         description: The start date for the transaction filter in YYYY-MM-DD format.
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-01-31"
 *         description: The end date for the transaction filter in YYYY-MM-DD format.
 *       - in: query
 *         name: bank
 *         schema:
 *           type: string
 *           example: "RSA"
 *         description: The code of the linked bank.
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ["internal", "external", "debt-payment", "internal-deposit"]
 *           example: "internal"
 *         description: The type of transaction.
 *     responses:
 *       200:
 *         description: Successful retrieval of transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status (0 for SUCCESS, -1 for ERROR).
 *                   example: 0
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalPages:
 *                       type: integer
 *                       description: The total number of pages for the filtered transactions.
 *                       example: 10
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error during the account information retrieval process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status (0 for SUCCESS, -1 for ERROR).
 *                   example: -1
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/pages', getTotalPagesController);
export default router;
