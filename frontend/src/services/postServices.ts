import { POST_ROUTE } from '../apiRoutes/postRoute';
import axios from '../config/axiosConfig'
interface PostData {
    title:string;
    content:string;
    author:string;
}

export const addPost = (data:PostData) => {
    try {
        return axios.post(POST_ROUTE.ADD_POST,data)
    } catch (error) {
        throw error
    }
}

export const getPost = (authorId:string) => {
    try {
        return axios.get(POST_ROUTE.GET_POST(authorId))
    } catch (error) {
        throw error
    }
}

export const editPost = (postId:string,data:PostData) => {
    try {
       return axios.put(POST_ROUTE.EDIT_POST(postId),data)
    } catch (error) {
        throw error
    }
}

export const deletePost = (postId:string) => {
    try {
        return axios.delete(POST_ROUTE.DELETE_POST(postId))
    } catch (error) {
        throw error
    }
}