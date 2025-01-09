// routes/userContact.routes.js
import express from "express";
import {
    createNewContactController,
    getAllContactsController,
    deleteContactController,
    checkContactExistsController,
    getUserContactsByTypeController,
    updateContactController
} from "../controllers/user_contact.controller.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: UserContacts
 *   description: User contact management API
 */
// Routes
/**
 * @swagger
 * /api/user-contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Add a new contact to the user's contact list.
 *     tags:
 *       - UserContacts
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_number:
 *                 type: string
 *                 example: "1234567890"
 *               nickname:
 *                 type: string
 *                 example: "John's Payment Account"
 *               bank_id:
 *                 type: string
 *                 example: "BANK123"
 *               bank_name:
 *                 type: string
 *                 example: "ABC Bank"
 *     responses:
 *       201:
 *         description: Contact created successfully.
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
 *                     account_number:
 *                       type: string
 *                       example: "1234567890"
 *                     nickname:
 *                       type: string
 *                       example: "John's Payment Account"
 *                     bank_id:
 *                       type: string
 *                       example: "BANK123"
 *                     bank_name:
 *                       type: string
 *                       example: "ABC Bank"
 *       500:
 *         description: Internal server error.
 */

router.post("/", createNewContactController);
/**
 * @swagger
 * /api/user-contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Retrieve all contacts for the authenticated user.
 *     tags:
 *       - UserContacts
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully.
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
 *                       account_number:
 *                         type: string
 *                         example: "1234567890"
 *                       nickname:
 *                         type: string
 *                         example: "John's Payment Account"
 *                       bank_id:
 *                         type: string
 *                         example: "BANK123"
 *                       bank_name:
 *                         type: string
 *                         example: "ABC Bank"
 *       500:
 *         description: Internal server error.
 */

router.get("/", getAllContactsController);
/**
 * @swagger
 * /api/user-contacts/{contactId}:
 *   delete:
 *     summary: Delete a contact
 *     description: Delete a contact by its ID.
 *     tags:
 *       - UserContacts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: The ID of the contact to delete.
 *         schema:
 *           type: string
 *           example: "12345"
 *     responses:
 *       200:
 *         description: Contact deleted successfully.
 *       400:
 *         description: Contact ID is required.
 *       500:
 *         description: Internal server error.
 */

router.delete("/:contactId", deleteContactController);
/**
 * @swagger
 * /api/user-contacts/check-existence:
 *   post:
 *     summary: Check if a contact exists
 *     description: Check if a contact with the given account number exists for the authenticated user.
 *     tags:
 *       - UserContacts
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_number:
 *                 type: string
 *                 example: "1234567890"
 *               bank_id:
 *                 type: string
 *                 example: "BANK123"
 *     responses:
 *       200:
 *         description: Contact existence check result.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Contact exists"
 *       400:
 *         description: Account number is required.
 *       500:
 *         description: Internal server error.
 */
router.post("/check-existence", checkContactExistsController);
/**
 * @swagger
 * /api/user-contacts/contacts:
 *   get:
 *     summary: Get user contacts by type
 *     description: Retrieve contacts filtered by type (internal/external).
 *     tags:
 *       - UserContacts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: type
 *         in: query
 *         required: true
 *         description: The type of contacts to retrieve (internal or external).
 *         schema:
 *           type: string
 *           example: "internal"
 *     responses:
 *       200:
 *         description: Contacts retrieved successfully.
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
 *                       account_number:
 *                         type: string
 *                         example: "1234567890"
 *                       nickname:
 *                         type: string
 *                         example: "John's Payment Account"
 *                       bank_id:
 *                         type: string
 *                         example: "BANK123"
 *                       bank_name:
 *                         type: string
 *                         example: "ABC Bank"
 *       500:
 *         description: Internal server error.
 */

router.get('/contacts', getUserContactsByTypeController); // Lấy danh bạ theo loại (internal/external)
/**
 * @swagger
 * /api/user-contacts/{contactId}:
 *   put:
 *     summary: Update a contact
 *     description: Update a contact's information by its ID.
 *     tags:
 *       - UserContacts
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: contactId
 *         in: path
 *         required: true
 *         description: The ID of the contact to update.
 *         schema:
 *           type: string
 *           example: "12345"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_number:
 *                 type: string
 *                 example: "1234567890"
 *               nickname:
 *                 type: string
 *                 example: "Updated Nickname"
 *               bank_id:
 *                 type: string
 *                 example: "BANK123"
 *               bank_name:
 *                 type: string
 *                 example: "Updated Bank"
 *     responses:
 *       200:
 *         description: Contact updated successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.
 */
router.put("/:contactId", updateContactController);

export default router;