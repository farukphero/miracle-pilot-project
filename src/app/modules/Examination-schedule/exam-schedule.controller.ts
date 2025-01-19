import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExaminationScheduleServices } from './exam-schedule.service';

const createExaminationSchedule = catchAsync(async (req, res) => {
  const examinationSchedule =
    await ExaminationScheduleServices.createExaminationScheduleIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Examination schedule created successful!',
    data: examinationSchedule,
  });
});
const getAllExaminationSchedule = catchAsync(async (req, res) => {
  const ExaminationSchedule =
    await ExaminationScheduleServices.getAllExaminationSchedulesFromDB(
      req.query,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Examination schedules are retrieves successful!',
    data: ExaminationSchedule,
  });
});

const getSingleExaminationSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;

  const examinationSchedule =
    await ExaminationScheduleServices.getSingleExaminationScheduleDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Examination schedule retrieved successful!',
    data: examinationSchedule,
  });
});

const updateExaminationSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;

  const examinationSchedule =
    await ExaminationScheduleServices.updateExaminationScheduleInDB(
      id,
      req.body,
    );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Examination schedule update successful!',
    data: examinationSchedule,
  });
});
const deleteExaminationSchedule = catchAsync(async (req, res) => {
  const { id } = req.params;

  const examinationSchedule =
    await ExaminationScheduleServices.deleteExaminationScheduleFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Examination schedule deleted successful!',
    data: examinationSchedule,
  });
});

export const ExaminationScheduleController = {
  createExaminationSchedule,
  getAllExaminationSchedule,
  getSingleExaminationSchedule,
  deleteExaminationSchedule,
  updateExaminationSchedule,
};
