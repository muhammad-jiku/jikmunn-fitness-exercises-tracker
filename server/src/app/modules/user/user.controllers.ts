import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import { UserServices } from './user.services';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const result = await UserServices.insertUserIntoDB(userData);
      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User created successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const loginData = req.body;
      const result = await UserServices.loginUserIntoDB(loginData);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

const getUserDashboard = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Assuming req.user is populated by an auth middleware
      const userId = req.user?.id as string;
      const result = await UserServices.getUserDashboard(userId);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User dashboard data retrieved successfully!',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
);

export const UserControllers = {
  createUser,
  loginUser,
  getUserDashboard,
};
