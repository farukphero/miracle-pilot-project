import QueryBuilder from '../../builder/QueryBuilder';
import { TransactionType } from '../Transaction/transaction.constant';
import { Transaction } from '../Transaction/transaction.model';
import { ISalary } from './salary.interface';
import { Salary } from './salary.model';

// Creating a salary
/**
 *
 * @param payload
 * @returns
 *
 * This function will use session to handle the changes in the Salary collection as well as the Transaction Collection
 */
const createSalaryIntoDB = async (payload: ISalary) => {
  const session = await Salary.startSession();
  session.startTransaction();

  try {
    const salary = await Salary.create([payload], { session });
    const transactionPayload = {
      userId: payload.userId,
      amount: payload.amount,
      transactionType: TransactionType.DEPOSIT,
      transactionSource: 'SALARY',
      transactionDate: payload.paymentDate,
      transactionId: payload.transactionId,
      note: payload.note,
    };
    await Transaction.create([transactionPayload], {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    return salary[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Get all salary from the DB
const getAllSalaryFromDB = async (query: Record<string, unknown>) => {
  const salary = new QueryBuilder(Salary.find(), query).sort().paginate();
  const meta = await salary.countTotal();

  const data = await salary.modelQuery;

  return {
    meta,
    data,
  };
};

// Get single salary
const getSingleSalaryFromDB = async (salaryId: string) => {
  const salary = await Salary.findById(salaryId);
  return salary;
};

// Update Salary
const updateSalaryIntoDB = async (salaryId: string, payload: ISalary) => {
  const salary = await Salary.findByIdAndUpdate(salaryId, payload, {
    new: true,
  });
  return salary;
};

// Delete Salary
const deleteSalaryFromDB = async (salaryId: string) => {
  const salary = await Salary.findByIdAndDelete(salaryId);
  return salary;
};

export const SalaryServices = {
  createSalaryIntoDB,
  getAllSalaryFromDB,
  getSingleSalaryFromDB,
  updateSalaryIntoDB,
  deleteSalaryFromDB,
};
