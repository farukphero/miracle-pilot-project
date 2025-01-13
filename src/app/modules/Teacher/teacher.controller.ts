import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TeacherServices } from './teacher.service';

const createTeacher = catchAsync(async (req, res) => {
  const teacher = await TeacherServices.createTeacherIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teacher created successful!',
    data: teacher,
  });
});
const getAllTeacher = catchAsync(async (req, res) => {
  const teacher = await TeacherServices.getAllTeacherFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teacher retrieved successful!',
    data: teacher,
  });
});

const getSingleTeacher = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await TeacherServices.getSingleTeacherDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teacher retrieved successful!',
    data: result,
  });
});

const updateTeacher = catchAsync(async (req, res) => {
  const { id } = req.params;

  const teacher = await TeacherServices.updateTeacherInDB(id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teacher update successful!',
    data: teacher,
  });
});
const deleteTeacher = catchAsync(async (req, res) => {
  const { id } = req.params;

  const teacher = await TeacherServices.deleteTeacherFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Teacher deleted successful!',
    data: teacher,
  });
});

export const teacherController = {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  deleteTeacher,
  updateTeacher,
};
