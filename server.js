import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bookingRoutes from './routes/bookingRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import Razorpay from 'razorpay'

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json())
// app.use(express.urlencoded());

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

// ROUTES

app.use('/api',bookingRoutes)

app.use('/api',emailRoutes)

app.get('/api/getkey',(req,res)=>{res.status(200).json({key:process.env.RAZORPAY_API_KEY})})


const port=process.env.PORT||9000;
app.listen(port,()=>{
    console.log(`server is working in port ${port}`)
})