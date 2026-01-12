import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
dotenv.config()
import { connectDb } from './config/databaseConfig'
import authRouter from './routes/authRoutes'
import postRouter from './routes/postRoutes'
import { errorHandler } from './middlewares/errorMiddleware'
const app = express()

const port = process.env.PORT

connectDb()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/posts',postRouter)

app.use(errorHandler)

app.listen(port,()=>{
    console.log("Server started successfully")
})