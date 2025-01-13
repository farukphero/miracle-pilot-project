import { StatusCodes } from 'http-status-codes';

import AppError from '../../errors/AppError';
import QueryBuilder from '../../builder/QueryBuilder';
import sanitizePayload from '../../middlewares/updateDataValidation';
import { Auth } from '../Auth/auth.model';
import config from '../../config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { generateAdminId } from './admin.utils';

const createAdminIntoDB = async (payload: TAdmin) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validate `userId`
    if (!payload.userId) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Please provide your ID.');
    }

    // Check if Admin already exists
    const existingAdmin = await Admin.findOne({
      userId: payload.userId,
    }).session(session);
    if (existingAdmin) {
      throw new AppError(
        StatusCodes.CONFLICT,
        `Admin already exists with ID ${payload.userId}`,
      );
    }

    // Generate Admin ID
    const adminId = await generateAdminId({ joiningDate: payload.joiningDate });

    // Verify if the user exists in Auth
    const userAuth = await Auth.findOne({ userId: payload.userId }).session(
      session,
    );

    if (!userAuth) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'User is not registered.');
    }

    // If no password is set, update the user's credentials
    if (!userAuth.password || userAuth.userId) {
      const hashedPassword = await bcrypt.hash(
        adminId,
        Number(config.bcrypt_salt_rounds),
      );
      await Auth.findOneAndUpdate(
        { userId: payload.userId },
        {
          $set: {
            isCompleted: true,
            role: 'admin',
            password: hashedPassword,
            userId: '',
          },
        },
        { session, new: true },
      );
    }

    // Sanitize and prepare the Admin payload
    const sanitizedPayload = sanitizePayload(payload);
    const adminData = new Admin({
      ...sanitizedPayload,
      adminId,
      auth: userAuth._id,
    });

    // Save the Admin data
    const savedAdmin = await adminData.save({ session });

    // Commit the transaction
    await session.commitTransaction();
    return savedAdmin;
  } catch (error) {
    // Rollback on error
    await session.abortTransaction();
    throw error;
  } finally {
    // Ensure the session is always ended
    session.endSession();
  }
};

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query).sort().paginate();

  const meta = await adminQuery.countTotal();
  const data = await adminQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getSingleAdminDetails = async (id: string) => {
  const singleAdmin = await Admin.findById(id);

  if (!singleAdmin) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No Admin found');
  }

  return singleAdmin;
};

const updateAdminInDB = async (id: string, payload: TAdmin) => {
  const sanitizeData = sanitizePayload(payload);

  const updatedAdmin = await Admin.findByIdAndUpdate(id, sanitizeData, {
    new: true,
    runValidators: true,
  });

  if (!updatedAdmin) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admin not found.');
  }

  return updatedAdmin;
};

const deleteAdminFromDB = async (id: string) => {
  // Find the Admin by ID
  const admin = await Admin.findById(id);

  // Check if Admin exists
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admin not found.');
  }

  // Mark the Admin as deleted
  admin.isDeleted = true;

  // Save changes to the database
  await admin.save();

  return admin;
};

export const AdminServices = {
  createAdminIntoDB,
  getAllAdminFromDB,
  getSingleAdminDetails,
  updateAdminInDB,
  deleteAdminFromDB,
};
