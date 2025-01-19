import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { TExamSetting } from './exam-setting.interface';
import { ExamSetting } from './exam-setting.model';

const createExamSettingIntoDB = async (payload: TExamSetting) => {
  // Check if ExamSetting already exists
  const existingExamSetting = await ExamSetting.findOne({
    class: payload.class,
    examName: payload.examName,
    examYear: payload.examYear,
  });

  if (existingExamSetting) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `An exam result already exists for ${payload.class} on ${payload.examName}.`,
    );
  }
  // Sanitize and prepare the ExamSetting payload
  const sanitizedPayload = sanitizePayload(payload);
  const examSettingData = new ExamSetting({ ...sanitizedPayload });

  // Save the ExamSetting data
  const savedExamSetting = await examSettingData.save();

  return savedExamSetting;
};

const getAllExamSettingsFromDB = async (query: Record<string, unknown>) => {
  const examSettingData = new QueryBuilder(ExamSetting.find(), query)
    .sort()
    .paginate();

  const meta = await examSettingData.countTotal();
  const data = await examSettingData.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleExamSettingDetails = async (id: string) => {
  const singleExamSetting = await ExamSetting.findById(id);

  if (!singleExamSetting) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No exam result found');
  }

  return singleExamSetting;
};

const updateExamSettingInDB = async (id: string, payload: TExamSetting) => {
  // const existingExamSetting = await ExamSetting.findOne({
  //   class: payload.class,
  //   examName: payload.examName,
  //   examYear: payload.examYear,
  //   _id: { $ne: id },
  // });

  // if (existingExamSetting) {
  //   throw new AppError(
  //     StatusCodes.CONFLICT,
  //     `An exam result already exists for ${payload.class} on ${payload.examName}.`,
  //   );
  // }
  // Ensure this class routine is not the one being updated

  const sanitizeData = sanitizePayload(payload);

  const updatedExamSetting = await ExamSetting.findByIdAndUpdate(
    id,
    sanitizeData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedExamSetting) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Exam result not found.');
  }

  return updatedExamSetting;
};

const deleteExamSettingFromDB = async (id: string) => {
  // Find the ExamSetting by ID
  const examSetting = await ExamSetting.findById(id);

  // Check if ExamSetting exists
  if (!examSetting) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Exam result not found.');
  }

  // Mark the ExamSetting as deleted
  examSetting.isDeleted = true;

  // Save changes to the database
  await examSetting.save();

  return examSetting;
};

export const ExamSettingServices = {
  createExamSettingIntoDB,
  getAllExamSettingsFromDB,
  getSingleExamSettingDetails,
  updateExamSettingInDB,
  deleteExamSettingFromDB,
};
