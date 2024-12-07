import express from 'express';
import { createDebtController, getDebtsByDebtorController } from '../controllers/debt.controller.js';

const router = express.Router();

router.post('/', createDebtController);
router.get('/:debtorAccount', getDebtsByDebtorController);

export default router;
