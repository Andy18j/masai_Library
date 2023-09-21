const mongoose = require("mongoose")
// const {ObjectId} = require("mongoose")

const userSchema = new mongoose.Schema({
    
        // _id: ObjectId,
        name: String,
        email: String,
        password: String,
        isAdmin: Boolean
      
})

const userModel = mongoose.model("user",userSchema)


module.exports = {
    userModel
}