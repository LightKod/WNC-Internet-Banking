import express from 'express';
import {changePasswordController, banUnbanEmployeeController,unassignEmployeeController,assignEmployeeController, listEmployeesController , getUserDetailController } from '../controllers/user.controller.js';

const router = express.Router();
/**
 * @swagger
 * /api/user/info:
 *   get:
 *     summary: Get user details
 *     description: Retrieve detailed information about the authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user details.
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         username:
 *                           type: string
 *                           example: "john_doe"
 *                         name:
 *                           type: string
 *                           example: "John Doe"
 *                         email:
 *                           type: string
 *                           example: "johndoe@example.com"
 *                         phone_number:
 *                           type: string
 *                           example: "1234567890"
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           example: "2024-01-01T00:00:00.000Z"
 *       404:
 *         description: User not found.
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
 *                   example: "User not found"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error"
 */
router.get("/info", getUserDetailController);

/**
 * @swagger
 * /api/user/:
 *   get:
 *     summary: List employees
 *     description: Retrieve a paginated list of employees with optional search by name.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "John"
 *         description: Search term to filter employees by name.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of employees.
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
 *                     data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           username:
 *                             type: string
 *                             example: "employee01"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           email:
 *                             type: string
 *                             example: "johndoe@example.com"
 *                           phone_number:
 *                             type: string
 *                             example: "1234567890"
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: "2024-01-01T00:00:00.000Z"
 *                           status:
 *                             type: string
 *                             example: "active"
 *                     total:
 *                       type: integer
 *                       example: 50
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error"
 */
router.get("/", listEmployeesController);

/**
 * @swagger
 * /api/user/assign:
 *   post:
 *     summary: Assign user as employee
 *     description: Assign a user with the specified username to the "employee" role.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *                 description: The username of the user to be assigned as an employee.
 *     responses:
 *       200:
 *         description: User successfully assigned as employee.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 message:
 *                   type: string
 *                   example: "User assigned as employee successfully"
 *       404:
 *         description: User not found.
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
 *                   example: "User not found"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error"
 */
router.post("/assign", assignEmployeeController);

/**
 * @swagger
 * /api/user/unassign:
 *   post:
 *     summary: Unassign employee role from a user
 *     description: Unassign the "employee" role from the user identified by their ID.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the employee to be unassigned.
 *     responses:
 *       200:
 *         description: Employee role unassigned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 message:
 *                   type: string
 *                   example: "Employee unassigned successfully"
 *       404:
 *         description: Employee not found or not assigned as an employee.
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
 *                   example: "Employee not found"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error"
 */
router.post("/unassign", unassignEmployeeController);

/**
 * @swagger
 * /api/user/ban-unban:
 *   post:
 *     summary: Ban or Unban an employee
 *     description: Ban or unban an employee based on their ID and the specified action.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *               - action
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 example: 1
 *                 description: The ID of the employee to be banned or unbanned.
 *               action:
 *                 type: string
 *                 enum:
 *                   - ban
 *                   - unban
 *                 example: "ban"
 *                 description: The action to perform. Use "ban" to ban the employee, or "unban" to unban them.
 *     responses:
 *       200:
 *         description: Employee banned or unbanned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 message:
 *                   type: string
 *                   example: "Employee banned successfully"
 *       404:
 *         description: Employee not found or not assigned as an employee.
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
 *                   example: "Employee not found"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error"
 */
router.post("/ban-unban", banUnbanEmployeeController);

/**
 * @swagger
 * /api/user/change-password:
 *   post:
 *     summary: Change user password
 *     description: Allows a user to change their password by providing the old password and a new password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "oldPassword123"
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 example: "newPassword123"
 *                 description: The new password that the user wants to set.
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: SUCCESS
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       400:
 *         description: Old password is incorrect.
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
 *                   example: "Old password is incorrect"
 *       500:
 *         description: Internal server error.
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
 *                   example: "Internal server error"
 */
router.post("/change-password", changePasswordController);

export default router;
