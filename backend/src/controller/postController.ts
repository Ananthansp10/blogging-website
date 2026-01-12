import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../common/statusCode";
import { ERROR_MESSAGES } from "../common/errorMessages";
import { ApiError } from "../utils/error";
import { postModel } from "../models/postModel";
import mongoose from "mongoose";
import { sendSuccess } from "../utils/success";
import { SUCCESS_MESSAGES } from "../common/successMessage";
export const createPost = async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const {title,content,author} = req.body
        if(!title || !content || !author){
            throw new ApiError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.MISSING_FIELD)
        }
        const post = await postModel.findOne({_id:new mongoose.Types.ObjectId(author),title:title})
        if(post){
            throw new ApiError(HTTP_STATUS.CONFLICT,ERROR_MESSAGES.POST_EXIT)
        }
        await postModel.create({
            title:title,
            content:content,
            author:new mongoose.Types.ObjectId(author)
        })
        sendSuccess(res,{
            statusCode:HTTP_STATUS.CREATED,
            message:SUCCESS_MESSAGES.POST_CREATED
        })
    } catch (error) {
        next(error)
    }
}

export const editPost = async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
         const postId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        const {title,content,author} = req.body
        if(!title || !content || !author){
            throw new ApiError(HTTP_STATUS.BAD_REQUEST,ERROR_MESSAGES.MISSING_FIELD)
        }
        const post = await postModel.findOne({_id:new mongoose.Types.ObjectId(postId)})
        if(!post){
                throw new ApiError(HTTP_STATUS.NOT_FOUND,ERROR_MESSAGES.POST_NOT_FOUND)
        }
        await postModel.findByIdAndUpdate(postId,{
            title:title,
            content:content,
            author:author
        })
        sendSuccess(res,{
            statusCode:HTTP_STATUS.OK,
            message:SUCCESS_MESSAGES.POST_UPDATED
        })
    } catch (error) {
        next(error)
    }
}

export const getPost = async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
        const posts = await postModel.find({_id:new mongoose.Types.ObjectId(userId),isDeleted:false})
        sendSuccess(res,{
            statusCode:HTTP_STATUS.OK,
            data:posts
        })
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
       const postId = Array.isArray(req.params.postId) ? req.params.postId[0] : req.params.postId
       const post = await postModel.findOne({_id:new mongoose.Types.ObjectId(postId)})
       if(!post){
            throw new ApiError(HTTP_STATUS.NOT_FOUND,ERROR_MESSAGES.POST_NOT_FOUND)
       }
       await postModel.findByIdAndUpdate(postId,{$set:{isDeleted:true}})
       sendSuccess(res,{
        statusCode:HTTP_STATUS.OK,
        message:SUCCESS_MESSAGES.POST_DELETED
       })
    } catch (error) {
        next(error)
    }
}