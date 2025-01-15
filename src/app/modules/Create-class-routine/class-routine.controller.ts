import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ClassRoutineServices } from './class-routine.service';

const createClassRoutine = catchAsync(async (req, res) => {
  const classRoutine = await ClassRoutineServices.createClassRoutineIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Class routine created successful!',
    data: classRoutine,
  });
});
const getAllClassRoutine = catchAsync(async (req, res) => {
  const classRoutine = await ClassRoutineServices.getAllClassRoutinesFromDB(
    req.query,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Class routine retrieved successful!',
    data: classRoutine,
  });
});

const getSingleClassRoutine = catchAsync(async (req, res) => {
  const { id } = req.params;

  const classRoutine =
    await ClassRoutineServices.getSingleClassRoutineDetails(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Class routine retrieved successful!',
    data: classRoutine,
  });
});

const updateClassRoutine = catchAsync(async (req, res) => {
  const { id } = req.params;

  const classRoutine = await ClassRoutineServices.updateClassRoutineInDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Class routine update successful!',
    data: classRoutine,
  });
});
const deleteClassRoutine = catchAsync(async (req, res) => {
  const { id } = req.params;

  const classRoutine = await ClassRoutineServices.deleteClassRoutineFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Class routine deleted successful!',
    data: classRoutine,
  });
});

export const classRoutineController = {
  createClassRoutine,
  getAllClassRoutine,
  getSingleClassRoutine,
  deleteClassRoutine,
  updateClassRoutine,
};
