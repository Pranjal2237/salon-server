import express from 'express'
import { queryEmail } from '../controllers/email.js';

const router=express.Router();

router.post('/queryemail',queryEmail)

export default router