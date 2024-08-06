import nodemailer from 'nodemailer'

export const queryEmail=async(req,res)=>{
    try {
        const {email,name,message,interest}=req.body;
        const html=`
        <p>You have recieved a mail from <b>${name}</b></p>
        <p>Interested for : ${interest}</p>
        <p>Message : ${message}</p>
        `
        const transporter = nodemailer.createTransport({
           service:'gmail',
           auth:{
            user:'pranjalvaish11122001@gmail.com',
            pass:'dxoyqseidsebfdsm'
           }
          });

          const info = await transporter.sendMail({
            from:email, 
            to: "pranjalvaish11122001@gmail.com", 
            subject: "Hello ✔", 
            text: "Hello world?",
            html: html,
          });
        
          console.log("Message sent: %s", info.messageId);
          res.status(201).json({success:true})
    } catch (error) {
        console.log(error)
    }
}


export const responseEmail=async(req,res)=>{
    try {
        const user=await Booking.create(req.body);
      const{name,email,phone,category,appointment,servicePerson,timing}=req.body;
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
    } catch (error) {
        console.log(error)
    }
}
