const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    firstname:{
        type: String,
        default: ''
    },
    lastname:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        unique: true,
        required: [true, "Please give an email"]
    },
    password:{
        type: String,
        required: [true, "Please give a password"]
    },
})

const UserModel = mongoose.model("User", userModel)
module.exports = UserModel