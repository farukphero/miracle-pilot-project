import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import config from '../../config';
import { TUser } from './auth.interface';
import { createToken, generateUserId } from './auth.utils';
import { Auth } from './auth.model';

const registerUserIntoDB = async (payload: TUser) => {
  const isEmailValid = (email: string): boolean => {
    const authRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return authRegex.test(email);
  };

  const isAuthEmail = isEmailValid(payload.email);

  if (!isAuthEmail) {
    throw new Error('Invalid email.');
  }

  const existingUser = await Auth.findOne({ email: payload.email });

  if (existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Email already exists.');
  }

  const newUser = await Auth.create({
    ...payload,
    userId: await generateUserId(),
  });

  const jwtPayload = {
    email: newUser.email,
    role: newUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    role: newUser.role,
    userId: newUser.userId,
    token: accessToken,
    refreshToken,
  };
};

const loginUserWithDB = async (payload: TUser) => {
  const { email, password } = payload;

  const existingUser = await Auth.findOne({ email });

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Account not found.');
  }
  const isDeleted = existingUser?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This account is deleted!');
  }

  console.log(password);

  const isPasswordValid = await existingUser.comparePassword(
    password as string,
  );

  console.log('Password match status:', isPasswordValid);

  if (!isPasswordValid) {
    throw new Error('Invalid password!');
  }

  const jwtPayload = {
    email: existingUser.email,
    role: existingUser.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    role: existingUser.role,
    token: accessToken,
    refreshToken,
  };
};
export const UserAuthServices = {
  registerUserIntoDB,
  loginUserWithDB,
};
