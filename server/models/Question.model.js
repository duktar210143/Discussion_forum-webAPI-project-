const mongoose = require('mongoose')

// create a model for user specific questions
const UserQuestions = new mongoose.Schema({
    question: {
        type: String, 
        required:true},
        // refrence of user that crated the question
    user:{
        type:String,
        ref:'User'
    }
},{
    collection:"User-Questions"
})

// export the question model
const questionModel = mongoose.model('User-Question',UserQuestions);

module.exports = questionModel;