import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const mongoUrl = process.env.MONGO_URL ?? ''

export const connectDb = () => {
    try {
       mongoose.connect(mongoUrl).then(()=>{
            console.log("Database connected successfully")
       }).catch((error)=>{
            console.log("Database not connected", error)
       })
    } catch (error) {
        console.log(error)
    }
}