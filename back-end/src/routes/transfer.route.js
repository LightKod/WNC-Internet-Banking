import express from 'express';
import transferController from '../controllers/transfer.controller.js';


const router = express.Router();

//Internal
router.post('/internal/initiate', transferController.initiateTransfer);
router.post('/internal/confirm', transferController.confirmTransfer);

//External
router.post('/external/initiate', transferController.initiateExternalTransfer);
router.post('/external/confirm', transferController.confirmExternalTransfer);
router.post('/external/account-info', transferController.accountInfo);
router.post('/external/deposit', transferController.deposit);
router.post('/external/link', transferController.linkBank);

export default router;
