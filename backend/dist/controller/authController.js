import { ApiError } from "../utils/error.js";
import { HTTP_STATUS } from "../common/statusCode.js";
import { ERROR_MESSAGES } from "../common/errorMessages.js";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendSuccess } from "../utils/success.js";
import { SUCCESS_MESSAGES } from "../common/successMessage.js";
import { createAccessToken, createRefreshToken } from "../utils/tokenGenerate.js";
export const registerUser = async (req, res, next) => {
    try {
        const { userName, email, phoneNumber, password } = req.body;
        if (!userName || !email || !phoneNumber || !password) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.MISSING_FIELD);
        }
        const user = await userModel.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] });
        if (user) {
            throw new ApiError(HTTP_STATUS.CONFLICT, ERROR_MESSAGES.USER_EXIST);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            userName: userName,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPassword
        });
        sendSuccess(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: SUCCESS_MESSAGES.USER_REGISTERED
        });
    }
    catch (error) {
        next(error);
    }
};
export const userSignIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError(HTTP_STATUS.BAD_REQUEST, ERROR_MESSAGES.MISSING_FIELD);
        }
        const user = await userModel.findOne({ email: email });
        if (!user) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new ApiError(HTTP_STATUS.UNAUTHORIZED, ERROR_MESSAGES.INVALID_PASSWORD);
        }
        const accessToken = createAccessToken({ userId: user._id.toString(), email: user.email });
        const refreshToken = createRefreshToken({ userId: user._id.toString(), email: user.email });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: parseInt(process.env.ACCESS_TOKEN_MAX_AGE ?? '')
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: parseInt(process.env.REFRESH_TOKEN_MAX_AGE ?? '')
        });
        sendSuccess(res, {
            statusCode: HTTP_STATUS.OK,
            message: SUCCESS_MESSAGES.USER_LOGGED_IN,
            data: {
                userName: user.userName,
                email: user.email,
                userId: user._id
            }
        });
    }
    catch (error) {
        next(error);
    }
};
export const userLogout = (req, res, next) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        sendSuccess(res, {
            statusCode: HTTP_STATUS.OK,
            message: SUCCESS_MESSAGES.LOGOUT_SUCCESS
        });
    }
    catch (error) {
        next(error);
    }
};
