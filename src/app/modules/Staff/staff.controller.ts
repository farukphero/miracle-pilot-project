import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StaffServices } from './staff.service';

const createStaff = catchAsync(async (req, res) => {
  const staff = await StaffServices.createStaffIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Staff created successful!',
    data: staff,
  });
});
const getAllStaff = catchAsync(async (req, res) => {
  const staff = await StaffServices.getAllStaffFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Staff retrieved successful!',
    data: staff,
  });
});

const getSingleStaff = catchAsync(async (req, res) => {
  const { id } = req.params;

  const staff = await StaffServices.getSingleStaffDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Staff retrieved successful!',
    data: staff,
  });
});

const updateStaff = catchAsync(async (req, res) => {
  const { id } = req.params;

  const staff = await StaffServices.updateStaffInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Staff update successful!',
    data: staff,
  });
});
const deleteStaff = catchAsync(async (req, res) => {
  const { id } = req.params;

  const staff = await StaffServices.deleteStaffFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Staff deleted successful!',
    data: staff,
  });
});

export const StaffController = {
  createStaff,
  getAllStaff,
  getSingleStaff,
  deleteStaff,
  updateStaff,
};
