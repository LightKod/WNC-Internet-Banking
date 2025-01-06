import express from 'express';
import { getAllTransactionsController,searchTransactionsController,getTotalPagesController } from '../controllers/transaction.controller.js';

const router = express.Router();

// Endpoint for searching transactions
router.get('/admin', getAllTransactionsController);
router.get('/search', searchTransactionsController);
router.get('/pages', getTotalPagesController);
export default router;
