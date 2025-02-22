import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalaryServices } from './salary.service';

const createSalary = catchAsync(async (req, res) => {
  const result = await SalaryServices.createSalaryIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Salary paid Successfully.',
    data: result,
  });
});

const getAllSalary = catchAsync(async (req, res) => {
  const result = await SalaryServices.getAllSalaryFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Salary retrieved Successfully.',
    data: result,
  });
});

const getSingleSalary = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SalaryServices.getSingleSalaryFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Salary retrieved Successfully.',
    data: result,
  });
});

const updateSalary = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SalaryServices.updateSalaryIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Salary updated Successfully.',
    data: result,
  });
});

const deleteSalary = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SalaryServices.deleteSalaryFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Salary deleted Successfully.',
    data: result,
  });
});

export const SalaryController = {
  createSalary,
  getAllSalary,
  getSingleSalary,
  updateSalary,
  deleteSalary,
};
