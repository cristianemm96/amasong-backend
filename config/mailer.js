import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
// create reusable transporter object using the default SMTP transport
console.log(process.env.MAILERPASSWORD)
export const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  secureConnection: false,
  port: 587, 
  tls: {
    ciphers:'SSLv3'
  },
  auth: {
    user: "cristianemanuelm96@outlook.com",
    pass: process.env.MAILERPASSWORD
},
});

transporter
  .verify()
  .then(() => console.log("Mailer OK"))
  .catch(console.log("Error al conectar"));
