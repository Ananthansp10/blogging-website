import { AUTH_ROUTE } from '../apiRoutes/authRoute'
import axios from '../config/axiosConfig'
import { FormData } from '../pages/SignupPage'

export const userRegister = (data:FormData) =>{
    try {
        return axios.post(AUTH_ROUTE.REGISTER,data)
    } catch (error) {
        throw error
    }
}

export const userLogin = (data:{email:string,password:string}) => {
    try {
        return axios.post(AUTH_ROUTE.LOGIN,data)
    } catch (error) {
        throw error
    }
}

export const userLogout = () => {
    try {
       return axios.post(AUTH_ROUTE.LOGOUT)
    } catch (error) {
        throw error
    }
}