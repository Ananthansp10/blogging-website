import { ApiError } from '../utils/error.js';
export const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered',
        });
    }
    return res.status(500).json({
        success: false,
        message: 'Server Error',
    });
};
