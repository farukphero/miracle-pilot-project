import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './auth.validation';

import authorization from '../../middlewares/authorization';
import { userAuthController } from './auth.controller';
import { USER_ROLE } from './auth.const';


const router = express.Router();

router
  .route('/register-user')
  .post(
    validateRequest(userValidations.userValidationSchemaForCreateUser),
    userAuthController.registerUser);

router
  .route('/login')
  .post(
    validateRequest(userValidations.userValidationSchemaForLogin),
    userAuthController.loginUser,
  );
// router
//   .route('/login/admin')
//   .post(
//     validateRequest(userValidations.userValidationSchemaForLogin),
//     userControllers.adminLogin,
//   );

// router
//   .route('/single-user')
//   .get(
//     authorization(USER_ROLE.admin, USER_ROLE.super_admin, USER_ROLE.user),
//     userControllers.getSingleUser,
//   );
// router
//   .route('/get/all/user')
//   .get(userControllers.getAllUser);

// router
//   .route('/:action(profile|update-password)')
//   .put(
//     authorization(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
//     validateRequest(userValidations.userUpdateValidationSchema),
//     updateFunc,
//   );
// router
//   .route(
//     '/:action(verify-user|forgot-password|forgot-verify|forgot-update-password)',
//   )
//   .put(validateRequest(userValidations.userUpdateValidationSchema), updateFunc);

// router
//   .route('/:id')
//   .delete(
//     authorization(USER_ROLE.user, USER_ROLE.super_admin),
//     userControllers.deleteUser,
//   );
// router
//   .route('/me/verify')
//   .get(authorization(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin), userControllers.getMe);
// router
//   .route('/me/verify/admin/role')
//   .get(authorization(USER_ROLE.admin, USER_ROLE.super_admin), userControllers.getMeAsAdmin);

export const AuthRoutes = router;
