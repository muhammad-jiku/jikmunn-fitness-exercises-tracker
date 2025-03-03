import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { WorkoutServices } from './workout.services';

const getWorkoutsByDate = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get user id from the authenticated request (populated by your auth middleware)
      const userId = req.user?.id as string;
      // Optionally get the date query parameter (defaults to current date in the service)
      const date = req.query.date as string;

      const result = await WorkoutServices.getWorkoutsByDate(userId, date);

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
      // Get user id and workout string from the request
      const userId = req.user?.id as string;
      const { workoutString } = req.body;

      const result = await WorkoutServices.addWorkout(userId, workoutString);

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
