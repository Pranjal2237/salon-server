import { instance } from "../server.js";
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import Booking from "../models/Booking.js";

export const onlineBooking = async (req, res) => {
  try {
    const options = {
      amount: 50000,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false });
  }
};

export const paymentVarification = async (req, res) => {
  try {
    // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    //   req.body;

    // const body = razorpay_order_id + "|" + razorpay_payment_id;

    // const expectedSignature = crypto
    //   .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    //   .update(body.toString())
    //   .digest("hex");

    const isAuthentic = true;
    if (isAuthentic) {
      res.redirect('http://localhost:3000/online-booking?confirmation=success')
    } else {
      res.status(404).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
};
