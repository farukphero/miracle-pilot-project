import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { TTeacher } from './teacher.interface';
import { Teacher } from './teacher.model';
import { generateTeacherId } from './teacher.utils';
import { Auth } from '../Auth/auth.model';
import config from '../../config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const createTeacherIntoDB = async (payload: TTeacher) => {
  // Start a new session
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Generate teacher ID
    const teacherId = await generateTeacherId({
      joiningDate: payload.joiningDate,
    });

    // Validate userId
    if (!payload.userId) {
      throw new AppError(StatusCodes.CONFLICT, 'Please add your Id.');
    }

    // Check if the user is registered in Auth
    const checkUserAuth = await Auth.findOne({ userId: payload.userId }).session(session);

    if (!checkUserAuth) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not registered.');
    }

    // Update the Auth document
    checkUserAuth.isCompleted = true;
    checkUserAuth.role = 'teacher';

    if (!checkUserAuth.password) {
      const hashedPassword = await bcrypt.hash(
        teacherId,
        Number(config.bcrypt_salt_rounds),
      );
      checkUserAuth.password = hashedPassword; // Assign hashed password if not already set
    }

    await checkUserAuth.save({ session });

    // Sanitize the payload
    const sanitizeData = sanitizePayload(payload);

    // Create and save the teacher
    const teacherData = new Teacher({
      ...sanitizeData,
      teacherId,
    });

    const savedTeacher = await teacherData.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return savedTeacher;
  } catch (error) {
    // Rollback the transaction on error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
  // Find the student by ID
  const teacher = await Teacher.findById(id);

  // Check if student exists
  if (!teacher) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Teacher not found.');
  }

  // Mark the student as deleted
  teacher.isDeleted = true;

  // Save changes to the database
  await teacher.save();

  // Return the updated student document
  return teacher;
};

export const TeacherServices = {
  createTeacherIntoDB,
  getAllTeacherFromDB,
  getSingleTeacherDetails,
  updateTeacherInDB,
  deleteTeacherFromDB,
};
