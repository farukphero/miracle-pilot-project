import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { TTeacher } from './academic.interface';
import { Teacher } from './academic.model';
import { generateTeacherId } from './academic.utils';

const createTeacherIntoDB = async (payload: TTeacher) => {
  const teacherId = await generateTeacherId({
    joiningDate: payload.joiningDate,
  });

  // Sanitize the payload
  const sanitizeData = sanitizePayload(payload);

  // Create and save the teacher
  const teacherData = new Teacher({
    ...sanitizeData,
    teacherId,
  });

  const savedTeacher = await teacherData.save();

  return savedTeacher;
};

const getAllTeacherFromDB = async (query: Record<string, unknown>) => {
  const teacherQuery = new QueryBuilder(Teacher.find(), query)
    .sort()
    .paginate();

  const meta = await teacherQuery.countTotal();
  const data = await teacherQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleTeacherDetails = async (id: string) => {
  const singleTeacher = await Teacher.findById(id);

  if (!singleTeacher) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No teacher found');
  }

  return singleTeacher;
};

const updateTeacherInDB = async (id: string, payload: TTeacher) => {
  // const existingStudent = await Teacher.findOne({
  //   $and: [
  //     { class: payload.class },
  //     { roll: payload.roll },
  //     { section: payload.section },
  //   ],
  //   _id: { $ne: id },
  // });

  // if (existingStudent) {
  //   throw new AppError(
  //     StatusCodes.CONFLICT,
  //     'A student with the same roll, class and section already exists.',
  //   );
  // }

  const sanitizeData = sanitizePayload(payload);

  const updatedTeacher = await Teacher.findByIdAndUpdate(id, sanitizeData, {
    new: true,
    runValidators: true,
  });

  if (!updatedTeacher) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Teacher not found.');
  }

  return updatedTeacher;
};

const deleteTeacherFromDB = async (id: string) => {
  const deletedTeacher = await Teacher.findByIdAndDelete(id);

  if (!deletedTeacher) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Teacher not found.');
  }

  return deletedTeacher;
};

export const TeacherServices = {
  createTeacherIntoDB,
  getAllTeacherFromDB,
  getSingleTeacherDetails,
  updateTeacherInDB,
  deleteTeacherFromDB,
};
