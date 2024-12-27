import express from 'express';
import { searchTransactionsController } from '../controllers/transaction.controller.js';

const router = express.Router();

// Endpoint for searching transactions
router.get('/search', searchTransactionsController);

export default router;
