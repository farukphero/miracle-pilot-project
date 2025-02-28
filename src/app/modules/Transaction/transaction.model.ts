import { model, Schema } from 'mongoose';
import { TransactionType } from './transaction.constant';
import { ITransaction } from './transaction.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: [true, 'User ID is required.'] },
    amount: { type: Number, required: [true, 'Amount is required.'] },
    transactionType: {
      type: String,
      enum: Object.values(TransactionType),
      required: [true, 'Transaction type is required.'],
    },
    transactionSource: {
      type: String,
      required: [true, 'Transaction source is required.'],
    },
    transactionDate: {
      type: String,
      required: [true, 'Transaction date is required.'],
    },
    transactionId: {
      type: String,
      required: [true, 'Transaction ID is required.'],
    },
    note: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Transaction = model<ITransaction>(
  'Transaction',
  transactionSchema,
);
