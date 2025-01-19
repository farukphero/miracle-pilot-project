import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExamSettingServices } from './exam-setting.service';

const createExamSetting = catchAsync(async (req, res) => {
  const examSetting = await ExamSettingServices.createExamSettingIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Exam setting created successful!',
    data: examSetting,
  });
});
const getAllExamSetting = catchAsync(async (req, res) => {
  const examSetting = await ExamSettingServices.getAllExamSettingsFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Exam settings are retrieves successful!',
    data: examSetting,
  });
});

const getSingleExamSetting = catchAsync(async (req, res) => {
  const { id } = req.params;

  const examSetting = await ExamSettingServices.getSingleExamSettingDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Exam setting retrieved successful!',
    data: examSetting,
  });
});

const updateExamSetting = catchAsync(async (req, res) => {
  const { id } = req.params;

  const examSetting = await ExamSettingServices.updateExamSettingInDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Exam setting update successful!',
    data: examSetting,
  });
});
const deleteExamSetting = catchAsync(async (req, res) => {
  const { id } = req.params;

  const examSetting = await ExamSettingServices.deleteExamSettingFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Exam setting deleted successful!',
    data: examSetting,
  });
});

export const ExamSettingController = {
  createExamSetting,
  getAllExamSetting,
  getSingleExamSetting,
  deleteExamSetting,
  updateExamSetting,
};
