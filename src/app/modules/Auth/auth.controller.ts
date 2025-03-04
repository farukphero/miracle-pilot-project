import { StatusCodes } from 'http-status-codes';
import { TUser } from './auth.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserAuthServices } from './auth.service';
import config from '../../config';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserAuthServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration successful.',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const user: Partial<TUser> = req.body;

  const result = await UserAuthServices.loginUserWithDB(user as TUser);

  const { refreshToken, token } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });


  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Login successful!',
    data: token,
  });
});


const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await UserAuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Token is retrieved successful.',
    data: result,
  });
});


const logout = catchAsync(async (req, res) => {
  await UserAuthServices.logout(res);


  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Logout successful.',
    data: "",
  });
});


export const userAuthController = {
  registerUser,
  loginUser,
  refreshToken,
  logout
};
