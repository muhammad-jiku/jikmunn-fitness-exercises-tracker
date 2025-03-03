import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: SignOptions['expiresIn']
): string => {
  const options: SignOptions = { expiresIn: expireTime };
  return jwt.sign(payload, secret, options);
};

const verifyToken = (payload: string, secret: Secret): JwtPayload => {
  console.log('payload', payload);
  console.log('secret', secret);
  return jwt.verify(payload, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
