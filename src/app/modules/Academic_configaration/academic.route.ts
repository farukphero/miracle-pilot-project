import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { teacherValidation } from './academic.validation';
import { teacherController } from './academic.controller';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin),
    validateRequest(teacherValidation.teacherValidationSchema),
    teacherController.createTeacher,
  )
  .get(teacherController.getAllTeacher);

router
  .route('/:id')
  .get(teacherController.getSingleTeacher)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(teacherValidation.updateTeacherValidationSchema),
    teacherController.updateTeacher,
  )
  .delete(teacherController.deleteTeacher);

export const TeacherRoutes = router;
