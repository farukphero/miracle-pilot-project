import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { userAuthController } from './auth.controller';

const router = express.Router();

router
  .route('/register-user')
  .post(
    validateRequest(AuthValidation.userAuthValidationSchemaForCreateUser),
    userAuthController.registerUser,
  );

router
  .route('/login')
  .post(
    validateRequest(AuthValidation.userAuthValidationSchemaForLogin),
    userAuthController.loginUser,
  );
 
  router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    userAuthController.refreshToken,
  );
  router.post("/logout", userAuthController.logout);
  

export const AuthRoutes = router;
