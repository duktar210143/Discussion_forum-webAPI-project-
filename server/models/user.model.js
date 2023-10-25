const mongoose = require("mongoose");

const User = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    confirmPassword:{type:String,},
    image:{type:String}
},{collection:'user-data'}
)

const model = mongoose.model("user-data",User);

module.exports = model;