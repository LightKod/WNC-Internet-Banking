import express from 'express';
import {
    createDebtController,
    getDebtsByDebtorController,
    getDebtByCreditorController,
    readDebtStatusController,
    readAllDebtsController
} from '../controllers/debt.controller.js';

const router = express.Router();

router.post('/', createDebtController);
router.get('/debtor', getDebtsByDebtorController);
router.get('/creditor', getDebtByCreditorController);
router.put('/read/:debtId', readDebtStatusController);
router.put('/read-all', readAllDebtsController);

export default router;
