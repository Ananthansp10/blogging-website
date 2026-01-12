import { Response } from "express";

interface SuccessOptions {
  message?: string;
  data?: any;
  statusCode?: number;
}

export const sendSuccess = (res: Response, options: SuccessOptions) => {
  const { message = "Success", data, statusCode = 200 } = options;
  if(data){
    return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
  }else{
    return res.status(statusCode).json({
    success: true,
    message,
  });
  }
};