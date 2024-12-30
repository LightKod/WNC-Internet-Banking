import express from 'express';
import { searchTransactionsController,getTotalPagesController } from '../controllers/transaction.controller.js';

const router = express.Router();

// Endpoint for searching transactions
router.get('/search', searchTransactionsController);
router.get('/pages', getTotalPagesController);
export default router;
