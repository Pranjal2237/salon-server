import mongoose from "mongoose";

const BookingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    appointment:{
        type:String,
        required:true
    },
    servicePerson:{
        type:String,
        required:true
    },
    timing:{
        type:[String],
        required:true
    }
},{timestamps:true})

const Booking=mongoose.model("Booking",BookingSchema)

export default Booking;