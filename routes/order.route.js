

const express = require("express")

const {orerModel} = require("../model/order.model")


const orderRouter = express.Router()


orderRouter.post("/api/order",async(req,res)=>{
    try{
        const payload = req.body
        const order = new orderModel(payload)
        await order.save()
        res.status(200).json({msg:"order are passed"})

    }
    catch(err){
        console.log(err)
        res.status(400).json({msg:"not getting order from this userID"})
    }
})



module.exports = {
    orderRouter
}