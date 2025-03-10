import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { WorkoutServices } from './workout.services';

const getWorkoutsByDate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userEmail = req.user?.email as string;
      const date = req.query.date as string;

      const result = await WorkoutServices.getWorkoutsByDate(userEmail, date);

      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Workouts retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const addWorkout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userEmail = req.user?.email as string;
      const { workoutString } = req.body;

      const result = await WorkoutServices.addWorkout(userEmail, workoutString);

      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Workouts added successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const WorkoutControllers = {
  getWorkoutsByDate,
  addWorkout,
};
