import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/handleApiError';
import { jwtHelpers } from '../../helpers/jwt';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    console.log('auth header: ' + authHeader);
    if (!authHeader) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Sorry, you are not authorized to access this route!'
      );
    }

    const token = authHeader.split(' ')[1];
    console.log('token ', token);
    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token format!');
    }

    const verifiedUserToken = jwtHelpers.verifyToken(
      token,
      config.jwt.secret as Secret
    );
    req.user = verifiedUserToken;

    next();
  } catch (error) {
    next(error);
  }
};
