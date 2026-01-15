import jwt from 'jsonwebtoken';
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET ?? '';
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET ?? '';
const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRE ?? '30m';
const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRE ?? '7d';
export const createAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
};
export const createRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES });
};
