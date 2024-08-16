import express from 'express'
import { verifyToken } from '../middlewares/auth.js';
import { futureAppointments, historyAppointments } from '../controllers/appointments.js';

const router=express.Router();

router.get('/appointments/future',verifyToken,futureAppointments)

router.get('/appointments/history',verifyToken,historyAppointments);

export default router;