import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { examinationScheduleValidation } from './exam-schedule.validation';
import { ExaminationScheduleController } from './exam-schedule.controller';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin, USER_ROLE.admin),
    validateRequest(
      examinationScheduleValidation.examinationScheduleValidationSchema,
    ),
    ExaminationScheduleController.createExaminationSchedule,
  )
  .get(ExaminationScheduleController.getAllExaminationSchedule);

router
  .route('/:id')
  .get(ExaminationScheduleController.getSingleExaminationSchedule)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(
      examinationScheduleValidation.updateExaminationScheduleValidationSchema,
    ),
    ExaminationScheduleController.updateExaminationSchedule,
  )
  .delete(ExaminationScheduleController.deleteExaminationSchedule);

export const ExaminationScheduleRoutes = router;
