import express from 'express';
import { getBankAccountByAccountNumberController, getAccountsByUserIdController, getPaymentAccountsByUserIdController, getUserDataByAccountNumberController } from "../controllers/account.controller.js";

const router = express.Router();

router.get('/user', getAccountsByUserIdController);
router.get('/user/payment', getPaymentAccountsByUserIdController);
router.get('/user/:accountNumber', getUserDataByAccountNumberController);
router.get('/external/account', getBankAccountByAccountNumberController); // Route tra cứu tài khoản ngân hàng

export default router;
