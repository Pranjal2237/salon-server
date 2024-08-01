import nodemailer from 'nodemailer'

export const queryEmail=async(req,res)=>{
    try {
        const {email,name,message,interest}=req.body;
        console.log(req.body);
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
        const {email,name,message,interest}=req.body;
        console.log(req.body);
        const html=`
        <p>You have recieved a mail from <b>${name}</b></p>
        <p>Interested for : ${interest}</p>
        <p>${message}</p>
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