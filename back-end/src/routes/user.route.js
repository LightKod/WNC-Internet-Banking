import express from 'express';
import {changePasswordController, banUnbanEmployeeController,unassignEmployeeController,assignEmployeeController, listEmployeesController , getUserDetailController } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/info", getUserDetailController);
router.get("/", listEmployeesController);
router.post("/assign", assignEmployeeController);
router.post("/unassign", unassignEmployeeController);
router.post("/ban-unban", banUnbanEmployeeController);
router.post("/change-password", changePasswordController);

export default router;
