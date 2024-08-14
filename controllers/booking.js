import { instance } from "../server.js";
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Staff from "../models/Staff.js";

export const onlineBooking = async (req, res) => {
  try {
    console.log(req.body);
    const {category,appointment,servicePerson,timing}=req.body;
    const userId=req.user.id;
    const options = {
      amount: 50000,
      currency: "INR",
    };
    const newOrder=await Booking.create({category,appointment,servicePerson,timing,userId,status:"Pending"})
    console.log(newOrder);
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, newOrder,order });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false });
  }
};

export const paymentVarification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    // const body = razorpay_order_id + "|" + razorpay_payment_id;

    // const expectedSignature = crypto
    //   .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    //   .update(body.toString())
    //   .digest("hex");
    const {id}=req.query;
    const isAuthentic = true;
    if (isAuthentic) {
      const booking=await Booking.findById(id);
      const user=await User.findById(booking.userId);
      const {name,email}=user;
      const {category,appointment,servicePerson,timing}=booking;
      let staff=await Staff.findOne({name:servicePerson});
      if(!staff)
      {
        staff=new Staff();
      }
      staff.name=servicePerson;
      const month=new Map()
      month.set("January",1).set("February",2).set("March",3).set("Aprail",4).set("May",5).set("June",6).set("July",7).set("August",8).set("September",9).set("October",10).set("November",11).set("December",12)
      timing.forEach((time) => {
        const arr=time.split(" at ");
        if(staff?.bookingTime?.has(arr[0]))
        {
          const data=staff.bookingTime.get(arr[0])
          if(data.length===3)
          {
            const datearr=arr[0].split(" ");
            const m=month.get(datearr[0]);
            const y=datearr[2];
            let d=0;
            for(let i=0;i<datearr[1].length;i++)
            {
              let c=datearr[1]?.charAt(i);
              let b=Number(c);
              if(b>=0 && b<=9)
              {
                d=d*10+b;
              }
              else{
                break;
              }
            }
            console.log(d);
            console.log(m);
            const e=new Date(y,m-1,d).toString();
            console.log(e);
            staff.bookingDate.push(e);
          }
          staff.bookingTime.set(arr[0],[...data,arr[1]])
        }
        else{
          staff.bookingTime.set(arr[0],[arr[1]])
        }
      });
      await staff.save();
      const stringTiming=timing.toString();
      const html=`
        <h3>Booking successful</h3>
        <p>Hello ${name},your ${appointment}, ${category} appointment with ${servicePerson} has been booked on ${stringTiming}</p>
        `
      const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
         user:'pranjalvaish11122001@gmail.com',
         pass:'dxoyqseidsebfdsm'
        }
       });

       const info = await transporter.sendMail({
         from:"pranjalvaish11122001@gmail.com", 
         to: email, 
         subject: "salon appointment booking successful", 
         text: "Hello world?",
         html: html,
       });
     
       console.log("Message sent: %s", info.messageId);
      booking.signature=razorpay_signature;
      booking.order_id=razorpay_order_id;
      booking.payment_id=razorpay_payment_id;
      booking.payment="Successful"
      await booking.save();

      res.redirect('http://localhost:3000/online-booking?confirmation=success')
    } else {
      console.log("working");
      const booking=await Booking.findByIdAndDelete(id);
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
};


// export const paymentStatus=async(req,res)=>{
//   try {
//     const {id}=req.query;
//     const booking=await Booking.findById(id);
//     if(booking.payment==="Unsuccessful")
//     {
//       await booking.deleteOne();
//     }
//     res.status(200).json({message:"payment status varified"})
//   } catch (error) {
//     console.log(error)
//   }
// }


export const getTimePeriod=async(req,res)=>{
  try {
    const staff=await Staff.findOne({name:"Alex"})
    res.status(200).json(staff);
  } catch (error) {
    console.log(error)
  }
}