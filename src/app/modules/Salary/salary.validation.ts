import { z } from 'zod';

const createSalaryValidationSchema = z.object({
  userId: z.string({ required_error: 'User ID is required.' }),
  month: z.string({ required_error: 'Month is required.' }),
  year: z.string({ required_error: 'Year is required.' }),
  amount: z.number({ required_error: 'Amount is required.' }),
  paymentStatus: z.string({ required_error: 'Payment status is required.' }),
  paymentDate: z.string({ required_error: 'Payment date is required.' }),
  paymentMethod: z.string({ required_error: 'Payment method is required.' }),
  transactionId: z.string({ required_error: 'Transaction ID is required.' }),
  note: z.string().optional(),
});

export const SalaryValidation = {
  createSalaryValidationSchema,
};
