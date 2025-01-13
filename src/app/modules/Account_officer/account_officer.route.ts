import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { accountOfficerValidation } from './account_officer.validation';
import { accountOfficerController } from './account_officer.controller';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin),
    validateRequest(accountOfficerValidation.accountOfficerValidationSchema),
    accountOfficerController.createAccountOfficer,
  )
  .get(accountOfficerController.getAllAccountOfficer);

router
  .route('/:id')
  .get(accountOfficerController.getSingleAccountOfficer)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(
      accountOfficerValidation.updateAccountOfficerValidationSchema,
    ),
    accountOfficerController.updateAccountOfficer,
  )
  .delete(accountOfficerController.deleteAccountOfficer);

export const AccountOfficerRoutes = router;
