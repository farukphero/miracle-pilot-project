import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { TExaminationSchedule } from './exam-schedule.interface';
import { ExaminationSchedule } from './exam-schedule.model';

const createExaminationScheduleIntoDB = async (
  payload: TExaminationSchedule,
) => {
  // Check if ExaminationSchedule already exists
  const existingExaminationSchedule = await ExaminationSchedule.findOne({
    examName: payload.examName,
    class: payload.class,
    section: payload.section,
    examDate: payload.examDate,
    examYear: payload.examYear,
  });

  if (existingExaminationSchedule) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `Exam schedule already exists with exam name-${payload.examName} class-${payload.class},section-${payload.section},and exam date-${payload.examDate}`,
    );
  }
  // Sanitize and prepare the ExaminationSchedule payload
  const sanitizedPayload = sanitizePayload(payload);
  const ExaminationScheduleData = new ExaminationSchedule({
    ...sanitizedPayload,
  });

  // Save the ExaminationSchedule data
  const savedExaminationSchedule = await ExaminationScheduleData.save();

  return savedExaminationSchedule;
};

const getAllExaminationSchedulesFromDB = async (
  query: Record<string, unknown>,
) => {
  const examinationScheduleQuery = new QueryBuilder(
    ExaminationSchedule.find(),
    query,
  )
    .sort()
    .paginate();

  const meta = await examinationScheduleQuery.countTotal();
  const data = await examinationScheduleQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleExaminationScheduleDetails = async (id: string) => {
  const singleExaminationSchedule = await ExaminationSchedule.findById(id);

  if (!singleExaminationSchedule) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No exam schedule found');
  }

  return singleExaminationSchedule;
};

const updateExaminationScheduleInDB = async (
  id: string,
  payload: TExaminationSchedule,
) => {
  // const existingExaminationSchedule = await ExaminationSchedule.findOne({
  //   examName: payload.examName,
  //   class: payload.class,
  //   section: payload.section,
  //   examDate: payload.examDate,
  //   examYear: payload.examYear,
  //   _id: { $ne: id }, // Ensure this class routine is not the one being updated
  // });

  // if (existingExaminationSchedule) {
  //   throw new AppError(
  //     StatusCodes.CONFLICT,
  //     `Exam schedule already exists with exam name-${payload.examName} class-${payload.class},section-${payload.section},and exam date-${payload.examDate}`,
  //   );
  // }

  const sanitizeData = sanitizePayload(payload);

  const updatedExaminationSchedule =
    await ExaminationSchedule.findByIdAndUpdate(id, sanitizeData, {
      new: true,
      runValidators: true,
    });

  if (!updatedExaminationSchedule) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Examination schedule not found.',
    );
  }

  return updatedExaminationSchedule;
};

const deleteExaminationScheduleFromDB = async (id: string) => {
  // Find the ExaminationSchedule by ID
  const examinationSchedule = await ExaminationSchedule.findById(id);

  // Check if ExaminationSchedule exists
  if (!examinationSchedule) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'Examination schedule not found.',
    );
  }

  // Mark the ExaminationSchedule as deleted
  examinationSchedule.isDeleted = true;

  // Save changes to the database
  await examinationSchedule.save();

  return examinationSchedule;
};

export const ExaminationScheduleServices = {
  createExaminationScheduleIntoDB,
  getAllExaminationSchedulesFromDB,
  getSingleExaminationScheduleDetails,
  updateExaminationScheduleInDB,
  deleteExaminationScheduleFromDB,
};
