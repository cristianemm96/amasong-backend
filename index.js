import  app  from "./app.js"
import "./database.js"
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT
app.listen(port,()=>{
    console.log("Corriendo en puerto", port)
})

