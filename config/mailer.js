import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
// create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "cristian.emanuel.96@gmail.com", // generated ethereal user
    pass: `${process.env.MAILERPASSWORD}`, // generated ethereal password
  },
});

transporter
  .verify()
  .then(() => console.log("Mailer OK"))
  .catch(console.log("Error al conectar"));
