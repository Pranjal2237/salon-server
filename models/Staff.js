import mongoose from "mongoose";

const staffSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    bookingTime:{
        type:Map,
        of:[String],
        default:{}
    },
    bookingDate:{
        type:[String],
        default:[]
    }
},{timestamps:true})

const Staff=mongoose.model("Staff",staffSchema);

export default Staff;