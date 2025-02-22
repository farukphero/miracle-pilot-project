import { TransactionType } from './transaction.constant';

export interface ITransaction {
  userId: string;
  amount: number;
  transactionType: TransactionType;
  transactionSource: string;
  transactionDate: string;
  transactionId: string;
  note?: string;
}
