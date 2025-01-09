import express from 'express';
import { getBankAccountByAccountNumberController, getAccountsByUserIdController, getPaymentAccountsByUserIdController, getUserDataByAccountNumberController } from "../controllers/account.controller.js";

const router = express.Router();
/**
 * @swagger
 * /api/account/user:
 *   get:
 *     summary: Get accounts by user ID
 *     description: Retrieve all accounts associated with the authenticated user.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved accounts associated with the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 data:
 *                   type: object
 *                   properties:
 *                     accounts:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: Account ID.
 *                             example: 1
 *                           account_number:
 *                             type: string
 *                             description: The unique account number.
 *                             example: "100000000001"
 *                           account_type:
 *                             type: string
 *                             description: The type of account (e.g., payment).
 *                             example: "payment"
 *                           balance:
 *                             type: number
 *                             description: The balance in the account.
 *                             example: 5000.75
 *                           currency:
 *                             type: string
 *                             description: The currency of the account.
 *                             example: "USD"
 *                           user_id:
 *                             type: integer
 *                             description: ID of the user who owns the account.
 *                             example: 123
 *       404:
 *         description: No accounts found for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "No accounts found for this user."
 *       500:
 *         description: Internal server error while fetching accounts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error."
 */
router.get('/user', getAccountsByUserIdController);


/**
 * @swagger
 * /api/account/user/payment:
 *   get:
 *     summary: Get payment account by user ID
 *     description: Retrieve the payment account associated with the authenticated user.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the payment account associated with the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 data:
 *                   type: object
 *                   properties:
 *                     account:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: Account ID.
 *                           example: 1
 *                         account_number:
 *                           type: string
 *                           description: The unique account number.
 *                           example: "100000000001"
 *                         account_type:
 *                           type: string
 *                           description: The type of account (e.g., payment).
 *                           example: "payment"
 *                         balance:
 *                           type: number
 *                           description: The balance in the account.
 *                           example: 5000.75
 *                         currency:
 *                           type: string
 *                           description: The currency of the account.
 *                           example: "USD"
 *                         user_id:
 *                           type: integer
 *                           description: ID of the user who owns the account.
 *                           example: 123
 *       404:
 *         description: No payment account found for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "No payment account found for this user."
 *       500:
 *         description: Internal server error while fetching the payment account.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error."
 */
router.get('/user/payment', getPaymentAccountsByUserIdController);

/**
 * @swagger
 * /api/account/user/{accountNumber}:
 *   get:
 *     summary: Get user data by account number
 *     description: Retrieve user information and account details based on the provided account number.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: accountNumber
 *         in: path
 *         required: true
 *         description: The account number to retrieve user and account information for.
 *         schema:
 *           type: string
 *           example: "100000000002"
 *     responses:
 *       200:
 *         description: Successfully retrieved user and account details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                       description: The username of the account holder.
 *                       example: johndoe
 *                     name:
 *                       type: string
 *                       description: The full name of the account holder.
 *                       example: John Doe
 *                     bank_name:
 *                       type: string
 *                       description: The name of the bank.
 *                       example: "BankA"
 *                     bank_id:
 *                       type: string
 *                       description: The unique identifier of the bank.
 *                       example: "123"
 *                     account_number:
 *                       type: string
 *                       description: The account number of the user.
 *                       example: "100000000002"
 *       404:
 *         description: Account not found or associated user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Account not found"
 *       500:
 *         description: Internal server error while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.get('/user/:accountNumber', getUserDataByAccountNumberController);

/**
 * @swagger
 * /api/account/external/account:
 *   post:
 *     summary: Get bank account details by account number and bank code
 *     description: Retrieve the details of a bank account from an external bank using the provided account number and bank code.
 *     tags:
 *       - Accounts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank_code:
 *                 type: string
 *                 description: The code of the bank to query.
 *                 example: "BANK123"
 *               account_number:
 *                 type: string
 *                 description: The account number of the user.
 *                 example: "100000000002"
 *     responses:
 *       200:
 *         description: Successfully retrieved bank account details or bank not linked.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 data:
 *                   type: object
 *                   properties:
 *                     account_number:
 *                       type: string
 *                       description: The account number.
 *                       example: "100000000002"
 *                     bank_name:
 *                       type: string
 *                       description: The name of the bank.
 *                       example: "Bank A"
 *                     bank_code:
 *                       type: string
 *                       description: The code of the bank.
 *                       example: "BANK123"
 *                     name:
 *                       type: string
 *                       description: The full name of the account holder.
 *                       example: "John Doe"
 *       404:
 *         description: Bank account or linked bank not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ERROR
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Bank account not found"
 *       500:
 *         description: Internal server error while processing the request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post('/external/account', getBankAccountByAccountNumberController); // Route tra cứu tài khoản ngân hàng

export default router;
