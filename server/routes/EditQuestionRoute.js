const express = require('express');
const router = express.Router();

const editQuestionController = require("../Controllers/EditquestionController");

// route to Posting question to the database
router.post('/editQuestion',editQuestionController.editUserQuestions);

module.exports = router;

