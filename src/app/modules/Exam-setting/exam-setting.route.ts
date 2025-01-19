import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { examSettingValidation } from './exam-setting.validation';
import { ExamSettingController } from './exam-setting.controller';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin, USER_ROLE.admin),
    validateRequest(examSettingValidation.examSettingValidationSchema),
    ExamSettingController.createExamSetting,
  )
  .get(ExamSettingController.getAllExamSetting);

router
  .route('/:id')
  .get(ExamSettingController.getSingleExamSetting)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(examSettingValidation.updateExamSettingValidationSchema),
    ExamSettingController.updateExamSetting,
  )
  .delete(ExamSettingController.deleteExamSetting);

export const ExamSettingRoutes = router;
