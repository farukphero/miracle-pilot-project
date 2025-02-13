import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AccountOfficerServices } from './account_officer.service';

const createAccountOfficer = catchAsync(async (req, res) => {
  const accountOfficer =
    await AccountOfficerServices.createAccountOfficerIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Accountant created successful!',
    data: accountOfficer,
  });
});
const getAllAccountOfficer = catchAsync(async (req, res) => {
  const accountOfficer =
    await AccountOfficerServices.getAllAccountOfficerFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Accountants retrieves successful!',
    data: accountOfficer,
  });
});

const getSingleAccountOfficer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result =
    await AccountOfficerServices.getSingleAccountOfficerDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Accountant retrieved successful!',
    data: result,
  });
});

const updateAccountOfficer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const accountOfficer = await AccountOfficerServices.updateAccountOfficerInDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Accountant update successful!',
    data: accountOfficer,
  });
});
const deleteAccountOfficer = catchAsync(async (req, res) => {
  const { id } = req.params;

  const accountOfficer =
    await AccountOfficerServices.deleteAccountOfficerFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Accountant deleted successful!',
    data: accountOfficer,
  });
});

export const accountOfficerController = {
  createAccountOfficer,
  getAllAccountOfficer,
  getSingleAccountOfficer,
  deleteAccountOfficer,
  updateAccountOfficer,
};
