import express from 'express'
import { getTimePeriod, onlineBooking, paymentVarification } from '../controllers/booking.js';
import { verifyToken } from '../middlewares/auth.js';

const router=express.Router();

router.post('/booking',verifyToken,onlineBooking);

router.post('/paymentVarification',paymentVarification)

router.get("/gettimePeriod",getTimePeriod);

export default router;