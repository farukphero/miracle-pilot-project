import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { classRoutineValidation } from './class-routine.validation';
import { classRoutineController } from './class-routine.controller';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin, USER_ROLE.admin),
    validateRequest(classRoutineValidation.classRoutineValidationSchema),
    classRoutineController.createClassRoutine,
  )
  .get(classRoutineController.getAllClassRoutine);

router
  .route('/:id')
  .get(classRoutineController.getSingleClassRoutine)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(classRoutineValidation.updateClassRoutineValidationSchema),
    classRoutineController.updateClassRoutine,
  )
  .delete(classRoutineController.deleteClassRoutine);

export const ClassRoutineRoutes = router;
