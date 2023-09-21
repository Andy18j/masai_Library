const express = require("express")
const { connection } = require("mongoose")
const {db} = require("./config/db")
require("dotenv").config()
const {userRouter} = require("./routes/user.route")
const {bookRouter} =require("./routes/book.route")
const {orderRouter} = require("./routes/order.route")


const app = express()
app.use(express.json())



app.use("/api/register",userRouter)
app.use("",bookRouter)
app.use("",orderRouter)

app.get("/",(req,res)=>{
   res.json("HOME PAGE")
})



app.listen(process.env.port,async ()=>{
    try{
        await connection
        console.log("connected to the db")
    }
    catch(err){
        console.log("Not connected to the db")
    }
       
    console.log(` port is running at ${process.env.port} `)
})