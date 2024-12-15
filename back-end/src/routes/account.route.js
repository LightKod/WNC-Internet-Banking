import express from 'express';
import { getAccountsByUserIdController, getPaymentAccountsByUserIdController } from "../controllers/account.controller.js";

const router = express.Router();

router.get('/user', getAccountsByUserIdController);
router.get('/user/payment', getPaymentAccountsByUserIdController);

export default router;
