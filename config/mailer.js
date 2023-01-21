import dotenv from "dotenv";
dotenv.config();

import nodemailer  from "nodemailer";
// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,            
  secure: false,  // true for 465, false for other ports
  auth: {
    user: "cristian.emanuel.96@gmail.com", // generated ethereal user
    pass: process.env.MAILERPASSWORD, // generated ethereal password
  },tls: {
    secureProtocol: "TLSv1_method"
}
});

transporter.verify().then(() => console.log("Ready"));
