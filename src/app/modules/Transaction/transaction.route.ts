import express from 'express';
import { TransactionController } from './transaction.controller';

const router = express.Router();

router
  .route('/')
  .post(TransactionController.createTransaction)
  .get(TransactionController.getAllTransaction);

router
  .route('/get-all-transaction-by-date')
  .get(TransactionController.getAllTransactionFromStartDateToEndDate);

router
  .route('/:id')
  .get(TransactionController.getSingleTransaction)
  .put(TransactionController.updateTransaction)
  .delete(TransactionController.deleteTransaction);

export const TransactionRoutes = router;
