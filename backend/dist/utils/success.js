export const sendSuccess = (res, options) => {
    const { message = "Success", data, statusCode = 200 } = options;
    if (data) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    else {
        return res.status(statusCode).json({
            success: true,
            message,
        });
    }
};
