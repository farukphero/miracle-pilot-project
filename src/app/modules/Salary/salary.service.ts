import QueryBuilder from '../../builder/QueryBuilder';
import { ISalary } from './salary.interface';
import { Salary } from './salary.model';

const createSalaryIntoDB = async (payload: ISalary) => {
  const salary = await Salary.create(payload);
  return salary;
};

const getAllSalaryFromDB = async (query: Record<string, unknown>) => {
  const salary = new QueryBuilder(Salary.find(), query).sort().paginate();
  const meta = await salary.countTotal();

  const data = await salary.modelQuery;

  return {
    meta,
    data,
  };
};

export const SalaryServices = {
  createSalaryIntoDB,
  getAllSalaryFromDB,
};
