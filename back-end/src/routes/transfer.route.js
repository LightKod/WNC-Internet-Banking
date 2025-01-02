import express from 'express';
import transferController from '../controllers/transfer.controller.js';
import passport from "passport";

const router = express.Router();
const protectRoute = passport.authenticate('jwt', { session: false });

//Internal
router.post('/internal/initiate', protectRoute, transferController.initiateTransfer);
router.post('/internal/confirm', protectRoute, transferController.confirmTransfer);
router.post('/internal/deposit', protectRoute, transferController.depositInternal);

//External
/**
 * @swagger
 * /external/initiate:
 *   post:
 *     summary: Initiate an external fund transfer
 *     description: This endpoint allows users to initiate an external fund transfer between accounts.
 *     tags:
 *       - Transfers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               source_account_number:
 *                 type: string
 *                 description: The account number from which the funds are being transferred.
 *                 example: "100000000002"
 *               destination_account_number:
 *                 type: string
 *                 description: The account number to which the funds are being transferred.
 *                 example: "100000000001"
 *               amount:
 *                 type: number
 *                 description: The amount of money to transfer.
 *                 example: 10.50
 *               bank_code:
 *                 type: string
 *                 description: The code of the destination bank.
 *                 example: "BankA"
 *               content:
 *                 type: string
 *                 description: The content or description of the transaction.
 *                 example: "Payment for services"
 *               fee_payer:
 *                 type: string
 *                 enum: [source, destination]
 *                 description: Indicates who will pay the transaction fee. Can be "source" or "destination".
 *                 example: "source"
 *     responses:
 *       200:
 *         description: Successful initiation of the external transfer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Contains details of the initiated transaction.
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Transfer initiated successfully."
 *                 code:
 *                   type: string
 *                   description: Status code of the operation.
 *                   example: "200"
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: "0"
 *       400:
 *         description: Bad request due to validation error or other issues.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid account number."
 *                 code:
 *                   type: string
 *                   description: Error code.
 *                   example: "400"
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: "-1"
 *       500:
 *         description: Internal server error during the transaction initiation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to initiate external transfer."
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: "-1"
 */
router.post('/external/initiate', protectRoute, transferController.initiateExternalTransfer);

/**
 * @swagger
 * /external/confirm:
 *   post:
 *     summary: Confirm an external fund transfer
 *     description: This endpoint allows users to confirm an external fund transfer using an OTP code and transaction details.
 *     tags:
 *       - Transfers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp_code:
 *                 type: string
 *                 description: The OTP code for confirming the transfer.
 *                 example: "123456"
 *               transaction_id:
 *                 type: string
 *                 description: The unique identifier of the transaction.
 *                 example: "txn_00123456789"
 *               bank_code:
 *                 type: string
 *                 description: The code of the destination bank.
 *                 example: "BankA"
 *               signature:
 *                 type: string
 *                 description: A digital signature to verify the transfer.
 *                 example: "abc123signature"
 *     responses:
 *       200:
 *         description: Successful confirmation of the external transfer.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Transfer confirmed successfully."
 *                 code:
 *                   type: string
 *                   description: Status code of the operation.
 *                   example: "200"
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: "0"
 *       400:
 *         description: Bad request due to validation error or other issues.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid OTP code or transaction ID."
 *                 code:
 *                   type: string
 *                   description: Error code.
 *                   example: "400"
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: "-1"
 *       500:
 *         description: Internal server error during the transfer confirmation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to confirm external transfer."
 *                 status:
 *                   type: string
 *                   description: Status of the operation.
 *                   example: "-1"
 */
router.post('/external/confirm', protectRoute, transferController.confirmExternalTransfer);

/**
 * @swagger
 * /external/account-info:
 *   post:
 *     summary: Retrieve account information
 *     description: This endpoint allows users to retrieve account information from a linked bank.
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
 *                 description: The code of the linked bank.
 *                 example: "BankA"
 *               account_number:
 *                 type: string
 *                 description: The account number to retrieve information for.
 *                 example: "100000000002"
 *               timestamp:
 *                 type: string
 *                 description: The timestamp of the request in ISO 8601 format.
 *                 example: "2025-01-02T12:00:00Z"
 *               hash:
 *                 type: string
 *                 description: A hash to verify the authenticity of the request.
 *                 example: "abcdef1234567890hashvalue"
 *     responses:
 *       200:
 *         description: Successful retrieval of account information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The account ID.
 *                   example: "12345"
 *                 account_number:
 *                   type: string
 *                   description: The account number.
 *                   example: "100000000002"
 *                 balance:
 *                   type: number
 *                   description: The current account balance.
 *                   example: 500.00
 *                 bank_code:
 *                   type: string
 *                   description: The linked bank's code.
 *                   example: "BankA"
 *                 signature:
 *                   type: string
 *                   description: A digital signature of the response.
 *                   example: "responseSignature123"
 *       400:
 *         description: Bad request due to validation error or expired request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Request has expired"
 *       403:
 *         description: Bank is not linked.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Bank not linked"
 *       404:
 *         description: Account not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Account not found"
 *       500:
 *         description: Internal server error during the account information retrieval process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post('/external/account-info', transferController.accountInfo);

/**
 * @swagger
 * /external/deposit:
 *   post:
 *     summary: Deposit funds into an account
 *     description: This endpoint allows depositing funds into a linked account.
 *     tags:
 *       - Transactions
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
 *                 description: The code of the linked bank.
 *                 example: "BankA"
 *               account_number:
 *                 type: string
 *                 description: The account number to deposit funds into.
 *                 example: "100000000002"
 *               amount:
 *                 type: number
 *                 description: The amount to deposit.
 *                 example: 1000.00
 *               timestamp:
 *                 type: string
 *                 description: The timestamp of the request in ISO 8601 format.
 *                 example: "2025-01-02T12:00:00Z"
 *               signature:
 *                 type: string
 *                 description: A digital signature to verify the authenticity of the request.
 *                 example: "signature123"
 *               hash:
 *                 type: string
 *                 description: A hash to verify the authenticity of the request.
 *                 example: "abcdef1234567890hashvalue"
 *     responses:
 *       200:
 *         description: Successful deposit of funds.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 account_number:
 *                   type: string
 *                   description: The account number that received the deposit.
 *                   example: "100000000002"
 *                 new_balance:
 *                   type: number
 *                   description: The updated account balance.
 *                   example: 1500.00
 *                 bank_code:
 *                   type: string
 *                   description: The linked bank's code.
 *                   example: "BankA"
 *                 signature:
 *                   type: string
 *                   description: A digital signature of the response.
 *                   example: "responseSignature123"
 *       400:
 *         description: Bad request due to validation error, expired request, or invalid signature/hash.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Invalid signature"
 *       403:
 *         description: Bank is not linked.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Bank not linked"
 *       404:
 *         description: Account not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Account not found"
 *       500:
 *         description: Internal server error during the deposit process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post('/external/deposit', transferController.deposit);
router.post('/external/link', protectRoute, transferController.linkBank);

export default router;
