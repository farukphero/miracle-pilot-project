import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { TClassRoutine } from './class-routine.interface';
import { ClassRoutine } from './class-routine.model';

const createClassRoutineIntoDB = async (payload: TClassRoutine) => {
  // Check if ClassRoutine already exists
  const existingClassRoutine = await ClassRoutine.findOne({
    class: payload.class,
    section: payload.section,
    teacherName: payload.teacherName,
  });

  if (existingClassRoutine) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `Routine already exists with class-${payload.class},section-${payload.section},and teacher-${payload.teacherName}`,
    );
  }
  // Sanitize and prepare the ClassRoutine payload
  const sanitizedPayload = sanitizePayload(payload);
  const classRoutineData = new ClassRoutine({ ...sanitizedPayload });

  // Save the ClassRoutine data
  const savedClassRoutine = await classRoutineData.save();

  return savedClassRoutine;
};

const getAllClassRoutinesFromDB = async (query: Record<string, unknown>) => {
  const classRoutineQuery = new QueryBuilder(ClassRoutine.find(), query)
    .sort()
    .paginate();

  const meta = await classRoutineQuery.countTotal();
  const data = await classRoutineQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleClassRoutineDetails = async (id: string) => {
  const singleClassRoutine = await ClassRoutine.findById(id);

  if (!singleClassRoutine) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No class routine found');
  }

  return singleClassRoutine;
};

const updateClassRoutineInDB = async (id: string, payload: TClassRoutine) => {
  // const existingClassRoutine = await ClassRoutine.findOne({
  //   class: payload.class,
  //   section: payload.section,
  //   teacherName: payload.teacherName,
  //   _id: { $ne: id }, // Ensure this class routine is not the one being updated
  // });

  // if (existingClassRoutine) {
  //   throw new AppError(
  //     StatusCodes.CONFLICT,
  //     `Routine already exists with class-${payload.class},section-${payload.section},and teacher-${payload.teacherName}`,
  //   );
  // }

  const sanitizeData = sanitizePayload(payload);

  const updatedClassRoutine = await ClassRoutine.findByIdAndUpdate(
    id,
    sanitizeData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedClassRoutine) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Class routine not found.');
  }

  return updatedClassRoutine;
};

const deleteClassRoutineFromDB = async (id: string) => {
  // Find the ClassRoutine by ID
  const classRoutine = await ClassRoutine.findById(id);

  // Check if ClassRoutine exists
  if (!classRoutine) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Class routine not found.');
  }

  // Mark the ClassRoutine as deleted
  classRoutine.isDeleted = true;

  // Save changes to the database
  await classRoutine.save();

  return classRoutine;
};

export const ClassRoutineServices = {
  createClassRoutineIntoDB,
  getAllClassRoutinesFromDB,
  getSingleClassRoutineDetails,
  updateClassRoutineInDB,
  deleteClassRoutineFromDB,
};
