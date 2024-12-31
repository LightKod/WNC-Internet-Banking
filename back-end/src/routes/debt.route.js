import express from 'express';
import {
    createDebtController,
    getDebtsByDebtorController,
    getDebtByCreditorController,
    readDebtStatusController,
    readAllDebtsController,
    getDebtByIdController,
    cancelDebtController,
    getAllDebtTransactionsController
} from '../controllers/debt.controller.js';

const router = express.Router();

router.get('/transactions', getAllDebtTransactionsController);
router.post('/', createDebtController);
router.get('/:debtId', getDebtByIdController);
router.get('/user/debtor', getDebtsByDebtorController);
router.get('/user/creditor', getDebtByCreditorController);
router.put('/read/:debtId', readDebtStatusController);
router.put('/read-all', readAllDebtsController);
router.post('/cancel', cancelDebtController);

export default router;
