import { NextFunction, Request, Response } from 'express';

import { StatusCodes } from 'http-status-codes';
import { TUser } from './auth.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserAuthServices } from './auth.service';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserAuthServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration successful.',
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<TUser> = req.body;

  const result = await UserAuthServices.loginUserWithDB(user as TUser);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful!',
    data: result,
  });
});

export const userAuthController = {
  registerUser,
  loginUser
};
