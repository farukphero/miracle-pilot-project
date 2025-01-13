import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';
 
 

const createAdmin = catchAsync(async (req, res) => {
  const admin = await AdminServices.createAdminIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin created successful!',
    data: admin,
  });
});
const getAllAdmin = catchAsync(async (req, res) => {
  const admin = await AdminServices.getAllAdminFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admins are retrieves successful!',
    data: admin,
  });
});


const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const admin = await AdminServices.getSingleAdminDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin retrieved successful!',
    data: admin,
  });
});


const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const admin = await AdminServices.updateAdminInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin update successful!',
    data: admin,
  });
});
const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const admin = await AdminServices.deleteAdminFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin deleted successful!',
    data: admin,
  });
});

export const adminController = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
