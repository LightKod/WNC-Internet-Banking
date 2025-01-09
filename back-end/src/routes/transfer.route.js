import express from 'express';
import transferController from '../controllers/transfer.controller.js';
import passport from "passport";
import { checkRole } from '../middleware/checkRole.js';
const router = express.Router();
const protectRoute = passport.authenticate('jwt', { session: false });

//Internal
/**
 * @swagger
 * /api/transfer/internal/initiate:
 *   post:
 *     summary: Initiate an internal transfer
 *     description: This endpoint initiates an internal transfer by sending an OTP to the user.
 *     tags:
 *       - Internal Transfers
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
 *                 description: Source account number for the transfer.
 *                 example: "100000000001"
 *               destination_account_number:
 *                 type: string
 *                 description: Destination account number for the transfer.
 *                 example: "100000000002"
 *               amount:
 *                 type: number
 *                 description: Amount to transfer.
 *                 example: 5000
 *               content:
 *                 type: string
 *                 description: Description of the transfer.
 *                 example: "Payment for services"
 *               fee_payer:
 *                 type: string
 *                 description: Who will pay the transfer fee ('sender' or 'receiver').
 *                 example: "sender"
 *               debt_id:
 *                 type: string
 *                 description: ID of the associated debt (optional).
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Transfer initiated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Details of the transfer initiation.
 *                 message:
 *                   type: string
 *                   description: Status message.
 *                   example: "Transfer initiated successfully"
 *                 status:
 *                   type: string
 *                   example: "SUCCESS"
 *       400:
 *         description: Bad request due to invalid data.
 *       500:
 *         description: Internal server error.
 */

router.post('/internal/initiate', protectRoute, transferController.initiateTransfer);
/**
 * @swagger
 * /api/transfer/internal/confirm:
 *   post:
 *     summary: Confirm an internal transfer
 *     description: Confirms an internal transfer by validating the OTP.
 *     tags:
 *       - Internal Transfers
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
 *                 description: OTP code for the transfer.
 *                 example: "123456"
 *               transaction_id:
 *                 type: string
 *                 description: ID of the transaction to confirm.
 *                 example: "txn_12345"
 *               debt_id:
 *                 type: string
 *                 description: Associated debt ID (optional).
 *                 example: "67890"
 *     responses:
 *       200:
 *         description: Transfer confirmed successfully.
 *       400:
 *         description: Invalid OTP or transaction ID.
 *       500:
 *         description: Internal server error.
 */

router.post('/internal/confirm', protectRoute, transferController.confirmTransfer);
/**
 * @swagger
 * /api/transfer/internal/deposit:
 *   post:
 *     summary: Deposit money internally
 *     description: Allows employees to deposit money into an account internally.
 *     tags:
 *       - Internal Transfers
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               infoType:
 *                 type: string
 *                 description: Type of account information (e.g., 'account_number').
 *                 example: "account_number"
 *               accountInfo:
 *                 type: string
 *                 description: Account identifier (e.g., account number).
 *                 example: "100000000001"
 *               amount:
 *                 type: number
 *                 description: Amount to deposit.
 *                 example: 10000
 *     responses:
 *       200:
 *         description: Deposit successful.
 *       400:
 *         description: Bad request due to validation error.
 *       500:
 *         description: Internal server error.
 */

router.post('/internal/deposit', protectRoute, checkRole('employee'), transferController.depositInternal);

//External
/**
 * @swagger
 * /api/transfer/external/initiate:
 *   post:
 *     summary: Initiate an external transfer
 *     description: Initiates an external transfer to a linked bank.
 *     tags:
 *       - External Transfers
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
 *                 description: Source account number for the transfer.
 *                 example: "100000000001"
 *               destination_account_number:
 *                 type: string
 *                 description: Destination account number at the linked bank.
 *                 example: "200000000002"
 *               amount:
 *                 type: number
 *                 description: Amount to transfer.
 *                 example: 10000
 *               bank_code:
 *                 type: string
 *                 description: Code of the linked bank.
 *                 example: "BankB"
 *               content:
 *                 type: string
 *                 description: Transfer description.
 *                 example: "External payment"
 *               fee_payer:
 *                 type: string
 *                 description: Who pays the fee ('sender' or 'receiver').
 *                 example: "receiver"
 *     responses:
 *       200:
 *         description: External transfer initiated successfully.
 *       400:
 *         description: Bad request due to validation error.
 *       500:
 *         description: Internal server error.
 */

router.post('/external/initiate', protectRoute, transferController.initiateExternalTransfer);
/**
 * @swagger
 * /api/transfer/external/confirm:
 *   post:
 *     summary: Confirm an external transfer
 *     description: Confirms an external transfer by validating OTP and signature.
 *     tags:
 *       - External Transfers
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
 *                 description: OTP code for the transfer.
 *                 example: "123456"
 *               transaction_id:
 *                 type: string
 *                 description: Transaction ID to confirm.
 *                 example: "txn_67890"
 *               bank_code:
 *                 type: string
 *                 description: Code of the linked bank.
 *                 example: "BankB"
 *               signature:
 *                 type: string
 *                 description: Digital signature of the request.
 *                 example: "signedData123"
 *     responses:
 *       200:
 *         description: External transfer confirmed successfully.
 *       400:
 *         description: Invalid OTP, transaction ID, or signature.
 *       500:
 *         description: Internal server error.
 */

router.post('/external/confirm', protectRoute, transferController.confirmExternalTransfer);

/**
 * @swagger
 * /api/transfer/external/account-info:
 *   post:
 *     summary: Retrieve account information
 *     description: This endpoint allows others bank to retrieve account information from this bank.
 *     tags:
 *       - External Transfers
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
 *                 name:
 *                   type: string
 *                   description: The name of the user.
 *                   example: John Doe
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
 *                 message:
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
 *                 message:
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
 *                 message:
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
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post('/external/account-info', transferController.accountInfo);

/**
 * @swagger
 * /api/transfer/external/deposit:
 *   post:
 *     summary: Deposit funds into an account
 *     description: This endpoint allows others bank to deposit funds into an account from this bank.
 *     tags:
 *       - External Transfers
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
 *                 message:
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
 *                 message:
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
 *                 message:
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
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post('/external/deposit', transferController.deposit);
router.post('/external/link', protectRoute, transferController.linkBank);

export default router;
