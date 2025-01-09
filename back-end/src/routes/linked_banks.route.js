import express from "express";
import { getAllLinkedBanksController, createLinkedBankController } from "../controllers/linked_banks.controller.js";

const router = express.Router();


/**
 * @swagger
 * /api/linked-banks:
 *   get:
 *     summary: Retrieve all linked banks
 *     description: Fetch a list of all linked banks from the system.
 *     tags:
 *       - Linked Banks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of linked banks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SUCCESS"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       bank_code:
 *                         type: string
 *                         description: The code of the linked bank.
 *                         example: "RSA"
 *                       bank_name:
 *                         type: string
 *                         description: The name of the linked bank.
 *                         example: "wnc_final_project"
 *       500:
 *         description: Internal server error during the retrieval process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Failed to fetch linked banks"
 */

router.get("/", getAllLinkedBanksController);
//router.post("/", createLinkedBankController);

export default router;
