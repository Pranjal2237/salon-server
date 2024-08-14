import express from 'express'
import { getUser, loginUser, registerUser} from '../controllers/user.js';
import { verifyToken } from '../middlewares/auth.js';

const router=express.Router();

router.post('/register',registerUser)

router.post('/login',loginUser)

router.get('/refresh',verifyToken,getUser);

export default router;