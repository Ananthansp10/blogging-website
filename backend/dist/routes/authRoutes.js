import express from 'express';
import { registerUser, userLogout, userSignIn } from '../controller/authController.js';
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', userSignIn);
router.post('/logout', userLogout);
export default router;
