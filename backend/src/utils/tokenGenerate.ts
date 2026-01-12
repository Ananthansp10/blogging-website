import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET ?? ''
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET ?? ''

const ACCESS_TOKEN_EXPIRES: string | number | any = process.env.ACCESS_TOKEN_EXPIRE ?? '30m'
const REFRESH_TOKEN_EXPIRES: string | number | any = process.env.REFRESH_TOKEN_EXPIRE ?? '7d'

interface JwtPayload {
  userId: string;
  email: string;
}

export const createAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
};

export const createRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
};
