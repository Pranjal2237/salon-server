import express from 'express'
import { onlineBooking, paymentVarification } from '../controllers/booking.js';

const router=express.Router();

router.post('/booking',onlineBooking);

router.post('/paymentVarification',paymentVarification)

export default router;