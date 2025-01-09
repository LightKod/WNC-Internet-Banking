import express from "express";
import { getAllLinkedBanksController, createLinkedBankController } from "../controllers/linked_banks.controller.js";

const router = express.Router();
/**
 * @swagger
 * /api/linked-banks/:
 *   get:
 *     summary: Get all linked banks
 *     description: Retrieve a list of all linked banks.
 *     tags:
 *       - Linked Banks
 *     responses:
 *       200:
 *         description: A list of linked banks.
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bank_code:
 *                         type: string
 *                         description: The code of the bank.
 *                         example: "BankA"
 *                       bank_name:
 *                         type: string
 *                         description: The name of the bank.
 *                         example: "Bank Alpha"
 *                       encryption_type:
 *                         type: string
 *                         description: The type of encryption used by the bank.
 *                         example: "RSA"
 *       500:
 *         description: Failed to fetch linked banks.
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
 *                   example: "Failed to fetch linked banks"
 */
router.get("/", getAllLinkedBanksController);
/**
 * @swagger
 * /api/linked-banks/:
 *   post:
 *     summary: Create a linked bank
 *     description: Add a new linked bank with the required details.
 *     tags:
 *       - Linked Banks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bank_code:
 *                 type: string
 *                 description: The code of the bank.
 *                 example: "BankB"
 *               bank_name:
 *                 type: string
 *                 description: The name of the bank.
 *                 example: "Bank Beta"
 *               public_key:
 *                 type: string
 *                 description: The public key of the bank.
 *                 example: "public_key_example"
 *               secret_key:
 *                 type: string
 *                 description: The secret key of the bank.
 *                 example: "secret_key_example"
 *               encryption_type:
 *                 type: string
 *                 description: The type of encryption used by the bank.
 *                 example: "RSA"
 *               account_info_api_url:
 *                 type: string
 *                 description: The API URL for account information.
 *                 example: "https://bankb.com/api/account-info"
 *               deposit_api_url:
 *                 type: string
 *                 description: The API URL for deposits.
 *                 example: "https://bankb.com/api/deposit"
 *     responses:
 *       201:
 *         description: Successfully created a new linked bank.
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
 *                     bank_code:
 *                       type: string
 *                       description: The code of the bank.
 *                       example: "BankB"
 *                     bank_name:
 *                       type: string
 *                       description: The name of the bank.
 *                       example: "Bank Beta"
 *       400:
 *         description: Missing required fields.
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
 *                   example: "All fields are required"
 *       409:
 *         description: Bank with the same bank_code already exists.
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
 *                   example: "A bank with this bank_code already exists"
 *       500:
 *         description: Failed to create linked bank.
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
 *                   example: "Failed to create linked bank"
 */
router.post("/", createLinkedBankController);

export default router;
