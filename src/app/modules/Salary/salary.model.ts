import { model, Schema } from 'mongoose';
import { ISalary } from './salary.interface';

const SalarySchema = new Schema<ISalary>({
  userId: { type: String, required: [true, 'User ID is required.'] },
  month: { type: String, required: [true, 'Month is required.'] },
  year: { type: String, required: [true, 'Year is required.'] },
  amount: { type: Number, required: [true, 'Amount is required.'] },
  paymentStatus: {
    type: String,
    required: [true, 'Payment status is required.'],
  },
  paymentDate: { type: String, required: [true, 'Payment date is required.'] },
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required.'],
  },
  transactionId: {
    type: String,
    required: [true, 'Transaction ID is required.'],
  },
  note: { type: String },
});

export const Salary = model<ISalary>('Salary', SalarySchema);
