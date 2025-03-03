import express from 'express';
import { auth } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { WorkoutValidations } from './workoout.validations';
import { WorkoutControllers } from './workout.controllers';

const router = express.Router();

router
  .route('/')
  .get(
    validateRequest(WorkoutValidations.getWorkoutsByDate),
    auth,
    WorkoutControllers.getWorkoutsByDate
  );

router
  .route('/add')
  .post(
    validateRequest(WorkoutValidations.addWorkout),
    auth,
    WorkoutControllers.addWorkout
  );

export const WorkoutRoutes = router;
