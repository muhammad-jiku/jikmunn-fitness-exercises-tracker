// user.routes.ts
import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserControllers } from './user.controllers';
import { UserValidations } from './user.validations';

const router = express.Router();

router
  .route('/create')
  .post(
    validateRequest(UserValidations.createUser),
    UserControllers.createUser
  );

router
  .route('/login')
  .post(validateRequest(UserValidations.loginUser), UserControllers.loginUser);

// Dashboard route can be protected via auth middleware; validations are optional if using req.user.
router
  .route('/dashboard')
  .get(
    validateRequest(UserValidations.getUserDashboard),
    auth,
    UserControllers.getUserDashboard
  );

export const UserRoutes = router;
