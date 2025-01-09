import express from 'express';
import {changePasswordController, banUnbanEmployeeController,unassignEmployeeController,assignEmployeeController, listEmployeesController , getUserDetailController } from '../controllers/user.controller.js';

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management API
 */
/**
 * @swagger
 * /api/user/info:
 *   get:
 *     summary: Get user details
 *     description: Retrieve the details of the authenticated user.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
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
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "12345"
 *                         username:
 *                           type: string
 *                           example: "john_doe"
 *                         email:
 *                           type: string
 *                           example: "john@example.com"
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/info", getUserDetailController);
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: List all employees
 *     description: Retrieve a list of all employees with pagination and optional search filter.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve.
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: The number of employees per page.
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: search
 *         in: query
 *         description: A search term to filter employees by username or email.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Employees retrieved successfully.
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
 *                       id:
 *                         type: string
 *                         example: "12345"
 *                       username:
 *                         type: string
 *                         example: "john_doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *       500:
 *         description: Internal server error.
 */
router.get("/", listEmployeesController);
/**
 * @swagger
 * /api/user/assign:
 *   post:
 *     summary: Assign a user as an employee
 *     description: Assign a user to the employee role by their username.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *     responses:
 *       200:
 *         description: User assigned as employee successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/assign", assignEmployeeController);
/**
 * @swagger
 * /api/user/unassign:
 *   post:
 *     summary: Unassign an employee
 *     description: Unassign an employee by their ID.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: Employee unassigned successfully.
 *       404:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 */

router.post("/unassign", unassignEmployeeController);
/**
 * @swagger
 * /api/user/ban-unban:
 *   post:
 *     summary: Ban or unban an employee
 *     description: Ban or unban an employee based on the provided action (ban/unban).
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeId:
 *                 type: string
 *                 example: "12345"
 *               action:
 *                 type: string
 *                 enum: [ban, unban]
 *                 example: "ban"
 *     responses:
 *       200:
 *         description: Employee banned/unbanned successfully.
 *       404:
 *         description: Employee not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/ban-unban", banUnbanEmployeeController);
/**
 * @swagger
 * /api/user/change-password:
 *   post:
 *     summary: Change user password
 *     description: Change the password of the authenticated user.
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "oldPassword123"
 *               newPassword:
 *                 type: string
 *                 example: "newPassword456"
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Old password is incorrect.
 *       500:
 *         description: Internal server error.
 */
router.post("/change-password", changePasswordController);

export default router;
