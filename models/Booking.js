import mongoose from "mongoose";

const BookingSchema=new mongoose.Schema({
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
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    order_id:{
        type:String,
    },
    payment_id:{
        type:String
    },
    signature:{
        type:String
    },
    status:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        default:"Unsuccessful"
    }
},{timestamps:true})

const Booking=mongoose.model("Booking",BookingSchema)

export default Booking;