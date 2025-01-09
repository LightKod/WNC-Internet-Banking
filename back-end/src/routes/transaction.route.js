import express from 'express';
import { getAllTransactionsController,searchTransactionsController,getTotalPagesController } from '../controllers/transaction.controller.js';
const router = express.Router();

// Endpoint for searching transactions
/**
 * @swagger
 * /api/transaction/admin:
 *   get:
 *     summary: Get all transactions
 *     description: Retrieve all transactions with optional filters like query, date range, bank, and type.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *         example: 1
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search keyword for transactions.
 *         example: "payment"
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the date range filter.
 *         example: "2025-01-01"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the date range filter.
 *         example: "2025-01-05"
 *       - in: query
 *         name: bank
 *         schema:
 *           type: string
 *         description: Bank code to filter transactions.
 *         example: "BankA"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Transaction type to filter.
 *         example: "deposit"
 *     responses:
 *       200:
 *         description: List of transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request.
 *                   example: "success"
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
 *                           amount:
 *                             type: number
 *                             example: 100.00
 *                           date:
 *                             type: string
 *                             example: "2025-01-01"
 *                           bank:
 *                             type: string
 *                             example: "BankA"
 *                           type:
 *                             type: string
 *                             example: "deposit"
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/admin', getAllTransactionsController);
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search transactions
 *     description: Search transactions using filters like query, date range, bank, and type.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *         example: 1
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search keyword.
 *         example: "transfer"
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the date range filter.
 *         example: "2025-01-01"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the date range filter.
 *         example: "2025-01-05"
 *       - in: query
 *         name: bank
 *         schema:
 *           type: string
 *         description: Bank code filter.
 *         example: "BankA"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Transaction type filter.
 *         example: "withdrawal"
 *     responses:
 *       200:
 *         description: Filtered transactions.
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
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           amount:
 *                             type: number
 *                             example: 200.00
 *                           date:
 *                             type: string
 *                             example: "2025-01-02"
 *                           bank:
 *                             type: string
 *                             example: "BankB"
 *                           type:
 *                             type: string
 *                             example: "withdrawal"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/search', searchTransactionsController);
/**
 * @swagger
 * /api/transaction/pages:
 *   get:
 *     summary: Get total pages for transactions
 *     description: Retrieve the total number of pages based on filters like query, date range, bank, and transaction type.
 *     tags:
 *       - Transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search keyword for transactions.
 *         example: "transfer"
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the date range filter.
 *         example: "2025-01-01"
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the date range filter.
 *         example: "2025-01-05"
 *       - in: query
 *         name: bank
 *         schema:
 *           type: string
 *         description: Bank code filter.
 *         example: "BankA"
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Transaction type filter.
 *         example: "deposit"
 *     responses:
 *       200:
 *         description: Total number of pages.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request.
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalPages:
 *                       type: integer
 *                       description: The total number of pages based on the applied filters.
 *                       example: 5
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Status of the request.
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */

router.get('/pages', getTotalPagesController);
export default router;
