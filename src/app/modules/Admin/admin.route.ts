import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidation } from './admin.validation';
import { adminController } from './admin.controller';

const router = express.Router();

router
  .route('/')
  .post(
    // authorization(USER_ROLE.super_admin, USER_ROLE.admin),
    // validateRequest(adminValidation.adminValidationSchema),
    adminController.createAdmin,
  )
  .get(adminController.getAllAdmin);

router
  .route('/:id')
  .get(adminController.getSingleAdmin)
  .put(
    // authorization(USER_ROLE.super_admin),
    validateRequest(adminValidation.updateAdminValidationSchema),
    adminController.updateAdmin,
  )
  .delete(adminController.deleteAdmin);

export const AdminRoutes = router;
