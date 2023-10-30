const express = require('express');
const router = express.Router();

const QuestionController = require("../Controllers/QuestionController")

// route to Posting question to the database
router.post('/setQuestions',QuestionController.QuestionController);

// route for fetching questions from database
router.get('/getQuestions',QuestionController.FetchQuestionController)


module.exports = router;

