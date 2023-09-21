const express = require("express")

const {bookModel} = require("../model/book.model")
const { model } = require("mongoose")
const { appendFile } = require("fs")
require("dotenv").config()



const bookRouter = express.Router()

bookRouter.get("/allbooks",async(req,res)=>{
    try {
        let data = await bookModel.find()
        res.status(200).json({data})

    }
    catch(err){
        console.log(err)
        res.status(401).send({msg:"failed to get the data"})
    }
})

bookRouter.get("/api/books/:id",async(req,res)=>{
    try{
        const data = await bookModel.findById(req.params.id)
        if (!data){
            return res.status(401).json({msg:"book not found"})
        }
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(401).json({msg:"error to get books"})
    }
})

bookRouter.post("/api/books",async(req,res)=>{
    try{
        const { title,author, category,price, quantity} = req.body
        const newbooks =new bookModel ({title,author,category,price,quantity})
        await newbooks.save()
        // console.log(newUser)
        res.status(201).json("new books are saved sucessfully🥳")
    }
    catch(err){
        console.log(err)
        res.status(401).json({msg:"books are not posted"})
    }
})

bookRouter.put("/api/books/:id",async(req,res)=>{
   try {
      const { title,author, category,price, quantity} = req.body
      const updatedBook = await bookModel.findByIdAndUpdate(
        req.params.id,
        {
            title,author,category,price,quantity,
        },
        {new:true}
      );
      if (!updatedBook){
        return res.status(401).json({msg:"books are not found"})
      }
      res.status(201).end()
   }
   catch(err){
    console.log(err)
    res.status(400).json({msg:"error"})
   }
})

module.exports = {
    bookRouter
}