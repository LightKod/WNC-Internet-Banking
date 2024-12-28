import express from 'express';
import transferController from '../controllers/transfer.controller.js';
import passport from "passport";

const router = express.Router();
const protectRoute = passport.authenticate('jwt', { session: false });

//Internal
router.post('/internal/initiate',protectRoute, transferController.initiateTransfer);
router.post('/internal/confirm',protectRoute, transferController.confirmTransfer);
router.post('/internal/deposit',protectRoute, transferController.depositInternal);

//External
router.post('/external/initiate',protectRoute, transferController.initiateExternalTransfer);
router.post('/external/confirm', protectRoute,transferController.confirmExternalTransfer);
router.post('/external/account-info',transferController.accountInfo);
router.post('/external/deposit', transferController.deposit);
router.post('/external/link',protectRoute, transferController.linkBank);

export default router;
