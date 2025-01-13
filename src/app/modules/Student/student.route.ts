import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { studentController } from './student.controller';
import { studentValidation } from './student.validation';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin),
    validateRequest(studentValidation.studentValidationSchema),
    studentController.createStudent,
  )
  .get(studentController.getAllStudents);

router
  .route('/:id')
  .get(studentController.getSingleStudent)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(studentValidation.updateStudentValidationSchema),
    studentController.updateStudent,
  )
  .patch(studentController.migrateClass)
  .delete(studentController.deleteStudent)
  ;

export const StudentRoutes = router;
