import express from 'express';
import { getAccountsByUserIdController, getPaymentAccountsByUserIdController, getUserDataByAccountNumberController } from "../controllers/account.controller.js";

const router = express.Router();

router.get('/user', getAccountsByUserIdController);
router.get('/user/payment', getPaymentAccountsByUserIdController);
router.get('/user/:accountNumber', getUserDataByAccountNumberController);

export default router;
