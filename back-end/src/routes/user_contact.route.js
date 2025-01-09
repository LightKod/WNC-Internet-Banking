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
 * /api/contact:
 *   post:
 *     summary: Create a new contact
 *     description: This endpoint allows a user to add a new contact with details such as account number, nickname, and bank information.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_number:
 *                 type: string
 *                 description: The account number of the contact.
 *                 example: "123456789012"
 *               nickname:
 *                 type: string
 *                 description: The nickname for the contact (optional).
 *                 example: "John Doe"
 *               bank_id:
 *                 type: string
 *                 description: The ID of the linked bank.
 *                 example: "PGP"
 *               bank_name:
 *                 type: string
 *                 description: The name of the linked bank.
 *                 example: "Bankit!"
 *     responses:
 *       201:
 *         description: Contact successfully created.
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
 *                     id:
 *                       type: integer
 *                       description: The ID of the newly created contact.
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       description: The ID of the user who created the contact.
 *                       example: 123
 *                     account_number:
 *                       type: string
 *                       description: The account number of the contact.
 *                       example: "123456789012"
 *                     nickname:
 *                       type: string
 *                       description: The nickname for the contact.
 *                       example: "John Doe"
 *                     bank_id:
 *                       type: string
 *                       description: The ID of the linked bank.
 *                       example: "PGP"
 *                     bank_name:
 *                       type: string
 *                       description: The name of the linked bank.
 *                       example: "Bankit!"
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the contact was created.
 *                       example: "2025-01-01T12:00:00Z"
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error.
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
 *   get:
 *     summary: Retrieve all contacts
 *     description: This endpoint allows a user to retrieve a list of their saved contacts.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all contacts.
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the contact.
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         description: The ID of the user who created the contact.
 *                         example: 123
 *                       account_number:
 *                         type: string
 *                         description: The account number of the contact.
 *                         example: "123456789012"
 *                       nickname:
 *                         type: string
 *                         description: The nickname for the contact (optional).
 *                         example: "John Doe"
 *                       bank_id:
 *                         type: string
 *                         description: The ID of the linked bank.
 *                         example: "PGP"
 *                       bank_name:
 *                         type: string
 *                         description: The name of the linked bank.
 *                         example: "Bankit!"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: The timestamp when the contact was created.
 *                         example: "2025-01-01T12:00:00Z"
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error.
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
 * /api/contact/{contactId}:
 *   delete:
 *     summary: Delete a contact
 *     description: This endpoint allows a user to delete a contact using the contact's ID.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: contactId
 *         in: path
 *         description: The ID of the contact to delete.
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Successfully deleted the contact.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status (0 for SUCCESS, -1 for ERROR).
 *                   example: 0
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the delete operation.
 *                   example: "Contact deleted successfully."
 *       400:
 *         description: Bad request due to missing or invalid contact ID.
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
 *                   description: Error message.
 *                   example: "Contact ID is required"
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error during the delete operation.
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
 *                   example: "Delete failed"
 *   put:
 *     summary: Update an existing contact
 *     description: This endpoint allows users to update an existing contact's details like account number, nickname, and bank information.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: integer
 *           description: The ID of the contact to be updated.
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_number:
 *                 type: string
 *                 description: The account number of the contact.
 *                 example: "987654321098"
 *               nickname:
 *                 type: string
 *                 description: The nickname for the contact (optional).
 *                 example: "Jane Smith"
 *               bank_id:
 *                 type: string
 *                 description: The ID of the linked bank.
 *                 example: "RSA"
 *               bank_name:
 *                 type: string
 *                 description: The name of the linked bank.
 *                 example: "Bank A"
 *     responses:
 *       200:
 *         description: Successfully updated the contact.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: Response status (0 for SUCCESS, -1 for ERROR).
 *                   example: 0
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Contact updated successfully"
 *                 data:
 *                   type: object
 *                   description: The updated contact data.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the updated contact.
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       description: The ID of the user who updated the contact.
 *                       example: 123
 *                     account_number:
 *                       type: string
 *                       description: The account number of the updated contact.
 *                       example: "987654321098"
 *                     nickname:
 *                       type: string
 *                       description: The nickname for the updated contact.
 *                       example: "Jane Smith"
 *                     bank_id:
 *                       type: string
 *                       description: The ID of the linked bank.
 *                       example: "RSA"
 *                     bank_name:
 *                       type: string
 *                       description: The name of the linked bank.
 *                       example: "Bank A"
 *       400:
 *         description: Bad request due to invalid input or missing contact data.
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
 *                   description: Error message.
 *                   example: "Invalid contact ID or missing required fields"
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error while updating the contact.
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
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.delete("/:contactId", deleteContactController);


/**
 * @swagger
 * /api/contact/check-existence:
 *   post:
 *     summary: Check if a contact exists
 *     description: This endpoint checks if a contact exists based on the account number and bank ID.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account_number:
 *                 type: string
 *                 description: The account number to check.
 *                 example: "123456789012"
 *               bank_id:
 *                 type: string
 *                 description: The bank ID to check.
 *                 example: "PGP"
 *     responses:
 *       200:
 *         description: Successfully checked the contact's existence.
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
 *                   type: boolean
 *                   description: Whether the contact exists (true or false).
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the existence of the contact.
 *                   example: "Contact exists"
 *       400:
 *         description: Bad request due to missing account number.
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
 *                   description: Error message.
 *                   example: "Account number is required"
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error while checking the contact's existence.
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
 *                   description: Error message.
 *                   example: "Internal server error"
 */
router.post("/check-existence", checkContactExistsController);


/**
 * @swagger
 * /api/contact/contacts:
 *   get:
 *     summary: Get user contacts by type
 *     description: This endpoint allows users to retrieve their contacts based on the type (internal/external). It also filters by bank ID if the type is external.
 *     tags:
 *       - Contacts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           description: The type of contacts to retrieve (internal or external).
 *           example: "internal"
 *     responses:
 *       200:
 *         description: Successfully retrieved contacts by type.
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
 *                   type: array
 *                   description: List of contacts filtered by type.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the contact.
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         description: The ID of the user.
 *                         example: 123
 *                       account_number:
 *                         type: string
 *                         description: The account number of the contact.
 *                         example: "123456789012"
 *                       nickname:
 *                         type: string
 *                         description: The nickname for the contact.
 *                         example: "John Doe"
 *                       bank_id:
 *                         type: string
 *                         description: The ID of the linked bank.
 *                         example: "PGP"
 *                       bank_name:
 *                         type: string
 *                         description: The name of the linked bank.
 *                         example: "Bankit!"
 *       400:
 *         description: Bad request due to missing or invalid type parameter.
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
 *                   description: Error message.
 *                   example: "Type parameter is required"
 *       401:
 *         description: Unauthorized access due to missing or invalid authentication token.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Unauthorized"
 *       500:
 *         description: Internal server error while retrieving contacts.
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
 *                   description: Error message.
 *                   example: "Internal server error"
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