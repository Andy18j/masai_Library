const express = require('express')
const {userModel} = require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userRouter = express.Router()

//user register route
userRouter.post("/register",async(req,res)=>{
    try{
        const {name,email,password,isAdmin} = req.body
       const hash = await bcrypt.hash(password,6)
        const newUser = new userModel({  name,email,password:hash,isAdmin })
        
        await newUser.save()
        // console.log(newUser)
        res.status(201).json("user are registerd sucessfully 🥳")
        
    }
    catch(err){
        res.status(401).json({err:err})
        console.log(err)
       
    }
})

// userRouter.post("/user",async(req,res)=>{
//     try{
//         const payload = req.body
//         const user = new userModel(payload)
//         await user.save()
        
//         res.send("user are created")

//     }
//     catch(err){
//         res.send(({msg:"failed"}))
//     }
// })


//user login route 
userRouter.post("/login",async(req,res)=>{
    try{
       const {email,password} = req.body

       const user = await userModel.findOne({email})

       if (!user){
        return res.status(401).json({msg:"user are not found"})
    }
        const convpass = await bcrypt.compare(password,user.password)
        const token = jwt.sign({userId:user._Id},"secret",{
            expiresIn:"1hr",
        });
        if (convpass){
            return res.status(201).json({msg:"user are logged",token})
        }else{
            return res.status(401).json({msg:"wrong credentials❌"})
        }
       
    }
    catch(err){
         console.log(err)
         res.status(401).send({msg:"Internal server error"})
    }
})

module.exports = {
    userRouter
}