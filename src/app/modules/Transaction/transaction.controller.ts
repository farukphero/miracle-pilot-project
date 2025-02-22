import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TransactionServices } from './transaction.service';

// Create Transaction
const createTransaction = catchAsync(async (req, res) => {
  const result = await TransactionServices.createTransactionIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction Created Successfully.',
    data: result,
  });
});

// Get All Transaction From DB
const getAllTransaction = catchAsync(async (req, res) => {
  const result = await TransactionServices.getAllTransactionFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction retrieved Successfully.',
    data: result,
  });
});

// Get Single Transaction From DB
const getSingleTransaction = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TransactionServices.getSingleTransactionFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction retrieved Successfully.',
    data: result,
  });
});

// Update Transaction
const updateTransaction = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TransactionServices.updateTransactionIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction updated Successfully.',
    data: result,
  });
});

// Delete Transaction
const deleteTransaction = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TransactionServices.deleteTransactionFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction deleted Successfully.',
    data: result,
  });
});

// Get All transaction from Start Date to End Date
const getAllTransactionFromStartDateToEndDate = catchAsync(async (req, res) => {
  const { startDate, endDate } = req.query;

  const result =
    await TransactionServices.getAllTransactionFromStartDateToEndDate(
      startDate as string,
      endDate as string,
    );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Transaction retrieved Successfully.',
    data: result,
  });
});

export const TransactionController = {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
  getAllTransactionFromStartDateToEndDate,
};
