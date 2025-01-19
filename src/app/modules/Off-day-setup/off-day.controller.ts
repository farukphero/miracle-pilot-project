import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OffDaySetupServices } from './off-day.service';

const createOffDaySetup = catchAsync(async (req, res) => {
  const offDaySetup = await OffDaySetupServices.createOffDaySetupIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Off day setup created successful!',
    data: offDaySetup,
  });
});
const getAllOffDaySetup = catchAsync(async (req, res) => {
  const offDaySetup = await OffDaySetupServices.getAllOffDaySetupsFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Off day setups are retrieves successful!',
    data: offDaySetup,
  });
});

const getSingleOffDaySetup = catchAsync(async (req, res) => {
  const { id } = req.params;

  const offDaySetup = await OffDaySetupServices.getSingleOffDaySetupDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Off day setup retrieved successful!',
    data: offDaySetup,
  });
});

const updateOffDaySetup = catchAsync(async (req, res) => {
  const { id } = req.params;

  const offDaySetup = await OffDaySetupServices.updateOffDaySetupInDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Off day setup update successful!',
    data: offDaySetup,
  });
});
const deleteOffDaySetup = catchAsync(async (req, res) => {
  const { id } = req.params;

  const offDaySetup = await OffDaySetupServices.deleteOffDaySetupFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Off day setup deleted successful!',
    data: offDaySetup,
  });
});

export const OffDaySetupController = {
  createOffDaySetup,
  getAllOffDaySetup,
  getSingleOffDaySetup,
  deleteOffDaySetup,
  updateOffDaySetup,
};
