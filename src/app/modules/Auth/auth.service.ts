import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import config from '../../config';
import { TUser } from './auth.interface';
import { createToken, generateUserId } from './auth.utils';
import { Auth } from './auth.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response } from "express";

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
    id: newUser._id,
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
    id: newUser._id,
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


  const isPasswordValid = await existingUser.comparePassword(
    password as string,
  );


  if (!isPasswordValid) {
    throw new Error('Invalid password!');
  }

  const jwtPayload = {
    id: existingUser._id,
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


const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const existingUser = await Auth.isUserExistsByCustomId(email);

  if (!existingUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found.');
  }
  // checking if the user is already deleted
  const isDeleted = existingUser?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
  }

  // checking if the user is blocked
  const userStatus = existingUser?.status;

  if (userStatus === 'block') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
  }

  if (
    existingUser.passwordChangedAt &&
    Auth.isJWTIssuedBeforePasswordChanged(existingUser.passwordChangedAt, iat as number)
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
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

  return {
    token: accessToken,
  };
};



const logout = async (res: Response) => {
  // Clear refreshToken cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    // sameSite: "none",
  });

  return { message: "Logged out successfully" };
}

export const UserAuthServices = {
  registerUserIntoDB,
  loginUserWithDB,
  refreshToken,
  logout
};
