import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { offDaySetupValidation } from './off-day.validation';
import { OffDaySetupController } from './off-day.controller';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin, USER_ROLE.admin),
    validateRequest(offDaySetupValidation.offDaySetupValidationSchema),
    OffDaySetupController.createOffDaySetup,
  )
  .get(OffDaySetupController.getAllOffDaySetup);

router
  .route('/:id')
  .get(OffDaySetupController.getSingleOffDaySetup)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(offDaySetupValidation.updateOffDaySetupValidationSchema),
    OffDaySetupController.updateOffDaySetup,
  )
  .delete(OffDaySetupController.deleteOffDaySetup);

export const OffDaySetupRoutes = router;
