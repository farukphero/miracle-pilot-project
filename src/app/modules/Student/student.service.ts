import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidtion';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (payload: TStudent) => {
  const existingStudent = await Student.findOne({
    $and: [
      { class: payload.class },
      { roll: payload.roll },
      { section: payload.section },
    ],
  });

  if (existingStudent) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'A student with the same roll, class and section already exists.',
    );
  }
  const student = await Student.create(payload);
  return student;
};

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find(), query)
    .sort()
    .paginate();

  const meta = await studentQuery.countTotal();
  const data = await studentQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleStudentDetails = async (id: string) => {
  const singleStudent = await Student.findById(id);

  if (!singleStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No student found');
  }

  return singleStudent;
};

const updateStudentInDB = async (id: string, payload: TStudent) => {
  const existingStudent = await Student.findOne({
    $and: [
      { class: payload.class },
      { roll: payload.roll },
      { section: payload.section },
    ],
    _id: { $ne: id },
  });

  if (existingStudent) {
    throw new AppError(
      StatusCodes.CONFLICT,
      'A student with the same roll, class and section already exists.',
    );
  }

  const sanitizeData = sanitizePayload(payload);

  const updatedStudent = await Student.findByIdAndUpdate(id, sanitizeData, {
    new: true,
    runValidators: true,
  });

  if (!updatedStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found.');
  }

  return updatedStudent;
};

const deleteStudentFromDB = async (id: string) => {
  const deletedStudent = await Student.findByIdAndDelete(id);

  if (!deletedStudent) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Student not found.');
  }

  return deletedStudent;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentDetails,
  updateStudentInDB,
  deleteStudentFromDB,
};
