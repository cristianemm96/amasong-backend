import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";

mongoose
  .connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.jc0ygl7.mongodb.net/?retryWrites=true&w=majority`)
  .then(console.log("Conectado a la db cloud"))
  .catch((err) => console.log(err));
