import express from 'express';
import { getBankAccountByAccountNumberController, getAccountsByUserIdController, getPaymentAccountsByUserIdController, getUserDataByAccountNumberController } from "../controllers/account.controller.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Account management API
 */
/**
 * @swagger
 * /api/account/user:
 *   get:
 *     summary: Get accounts by user ID
 *     description: Retrieve all accounts associated with a user by their user ID.
 *     tags:
 *       - Account
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Accounts retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     accounts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           accountNumber:
 *                             type: string
 *                             example: "1234567890"
 *                           accountType:
 *                             type: string
 *                             example: "savings"
 *                           balance:
 *                             type: number
 *                             example: 5000.75
 *       404:
 *         description: No accounts found for this user.
 *       500:
 *         description: Internal server error.
 */

router.get('/user', getAccountsByUserIdController);
/**
 * @swagger
 * /api/account/user/payment:
 *   get:
 *     summary: Get payment accounts by user ID
 *     description: Retrieve the payment account associated with the user by their user ID.
 *     tags:
 *       - Account
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Payment account retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     account:
 *                       type: object
 *                       properties:
 *                         accountNumber:
 *                           type: string
 *                           example: "9876543210"
 *                         accountType:
 *                           type: string
 *                           example: "payment"
 *                         balance:
 *                           type: number
 *                           example: 1000.50
 *       404:
 *         description: No payment account found for this user.
 *       500:
 *         description: Internal server error.
 */

router.get('/user/payment', getPaymentAccountsByUserIdController);
/**
 * @swagger
 * /api/account/user/{accountNumber}:
 *   get:
 *     summary: Get user data by account number
 *     description: Retrieve user data based on a given account number.
 *     tags:
 *       - Account
 *     parameters:
 *       - name: accountNumber
 *         in: path
 *         required: true
 *         description: The account number to fetch data for.
 *         schema:
 *           type: string
 *           example: "1234567890"
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       example: "user123"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *       404:
 *         description: Account not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/user/:accountNumber', getUserDataByAccountNumberController);
/**
 * @swagger
 * /api/account/external/account:
 *   post:
 *     summary: Get bank account by account number
 *     description: Retrieve external bank account information by bank code and account number.
 *     tags:
 *       - Account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank_code:
 *                 type: string
 *                 example: "ABC123"
 *               account_number:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: Bank account retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     bankCode:
 *                       type: string
 *                       example: "ABC123"
 *                     accountNumber:
 *                       type: string
 *                       example: "9876543210"
 *                     accountType:
 *                       type: string
 *                       example: "checking"
 *                     balance:
 *                       type: number
 *                       example: 1500.00
 *       404:
 *         description: Bank account not found.
 *       500:
 *         description: Internal server error.
 */
router.post('/external/account', getBankAccountByAccountNumberController); // Route tra cứu tài khoản ngân hàng

export default router;
