const mongoose = require("mongoose");

const User = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    confirmPassword:{type:String,require:true}
},{collection:'user-data'}
)

const model = mongoose.model("user-data",User);

module.exports = model;