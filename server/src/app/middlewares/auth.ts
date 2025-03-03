import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/handleApiError';
import { jwtHelpers } from '../../helpers/jwt';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Sorry, you are not authorized to access this route!'
      );
    }

    const verifiedUserToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    req.user = verifiedUserToken; // Contains user data

    next();
  } catch (error) {
    next(error);
  }
};
