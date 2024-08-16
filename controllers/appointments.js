import Booking from "../models/Booking.js";
import User from "../models/User.js"



export const futureAppointments=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id);
        console.log(req.user.id);
        if(!user)
        {
            return res.json(404).json({message:"Invalid Credentials"})
        }
        const{name}=user;
        const appointments=await Booking.find({userId:req.user.id,status:"Pending",payment:"Successful"})
        res.status(200).json({appointments,name})
    } catch (error) {
        console.log(error)
    }
}

export const historyAppointments=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id);
        if(!user)
        {
            return res.json(404).json({message:"Invalid Credentials"})
        }
        const{name}=user;
        const appointments=await Booking.find({userId:req.user.id,status:"FullFilled",payment:"Successful"})
        res.status(200).json({appointments,name})
    } catch (error) {
        console.log(error)
    }
}