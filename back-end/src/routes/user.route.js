import express from 'express';
import { getUserDetailController } from '../controllers/user.controller.js';

const router = express.Router();

router.get("/info", getUserDetailController);

export default router;
