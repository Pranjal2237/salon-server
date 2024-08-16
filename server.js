import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bookingRoutes from './routes/bookingRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import userRoute from './routes/userRoute.js'
import appointmentRoute from './routes/appointmentRoutes.js'
import Razorpay from 'razorpay'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

// ROUTES

app.use('/api',bookingRoutes);

app.use('/api',emailRoutes)

app.use('/api/user',userRoute);

app.use('/api',appointmentRoute)

app.get('/api/getkey',(req,res)=>{res.status(200).json({key:process.env.RAZORPAY_API_KEY})})


const port=process.env.PORT||9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`Server Port: ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));