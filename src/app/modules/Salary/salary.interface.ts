export interface ISalary {
  userId: string;
  month: string;
  year: string;
  amount: number;
  paymentStatus: string;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  note?: string;
}
