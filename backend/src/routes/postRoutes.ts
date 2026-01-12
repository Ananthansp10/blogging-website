import express from 'express'
import { createPost, deletePost, editPost, getPost } from '../controller/postController'
import { verifyToken } from '../middlewares/verifyTokenMiddleware'
const router = express.Router()

router.post('/',verifyToken,createPost)
router.get('/:id',verifyToken,getPost)
router.put('/:id',verifyToken,editPost)
router.delete('/:id',verifyToken,deletePost)

export default router