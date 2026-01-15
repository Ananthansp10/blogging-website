import express from 'express'
import { createPost, deletePost, editPost, getPost } from '../controller/postController.js'
import { verifyToken } from '../middlewares/verifyTokenMiddleware.js'
const router = express.Router()

router.post('/',verifyToken,createPost)
router.get('/post/:id',verifyToken,getPost)
router.put('/:id',verifyToken,editPost)
router.delete('/:id',verifyToken,deletePost)

export default router