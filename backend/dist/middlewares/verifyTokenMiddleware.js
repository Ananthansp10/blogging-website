import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";
import { HTTP_STATUS } from "../common/statusCode.js";
import { createAccessToken } from "../utils/tokenGenerate.js";
const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET ?? "";
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET ?? "";
export const verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        const refreshToken = req.cookies.refreshToken;
        if (!accessToken && !refreshToken) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
        }
        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
                return next();
            }
            catch (err) {
                if (err.name !== "TokenExpiredError") {
                    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid access token");
                }
            }
        }
        if (refreshToken) {
            try {
                const decodedRefresh = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
                const newAccessToken = createAccessToken({ userId: decodedRefresh.userId, email: decodedRefresh.email });
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 15 * 60 * 1000
                });
                return next();
            }
            catch (err) {
                throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Invalid refresh token, please login again");
            }
        }
        throw new ApiError(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
    }
    catch (error) {
        next(error);
    }
};
