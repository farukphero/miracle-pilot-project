import QueryBuilder from '../../builder/QueryBuilder';
import { ISalary } from './salary.interface';
import { Salary } from './salary.model';

// Creating a salary
const createSalaryIntoDB = async (payload: ISalary) => {
  const salary = await Salary.create(payload);
  return salary;
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
