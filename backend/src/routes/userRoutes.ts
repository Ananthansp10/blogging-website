import express from 'express'
import { verifyToken } from '../middlewares/verifyTokenMiddleware.js'
import { getPost } from '../controller/postController.js'
const router = express.Router()

router.get('/:id',verifyToken,getPost)

export default router