

const mongoose = require("mongoose")


const bookSchema = new mongoose.Schema({
    // _id: ObjectId,
  title: String,
  author: String,
  category: String,
  price: Number,
  quantity: Number
})


const bookModel = mongoose.model("book",bookSchema)

module.exports = {
    bookModel
}


