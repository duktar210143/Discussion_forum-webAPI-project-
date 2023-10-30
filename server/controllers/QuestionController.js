const jwt = require("jsonwebtoken");
const Question = require("../models/Question.model");
const User = require("../models/User.model");

const QuestionController = async (req, res) => {
  // get token from the request header
  const token = req.headers["x-access-token"];
  const addQuestion = req.body.question;
  try {
    if (!token) {
      return res.status(401).json({ message: "token not provided" });
    }
    // extract email
    const decoded = jwt.verify(token, "secretKey200");

    // get user email from the token payload
    const email = decoded.email;

    // find user associated with the email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    // create question and refrence to the user that created the question
    const newQuestion = new Question({
      question: addQuestion,
      user: user.email,
    });

    // save the newly created question to database and send the res as list of question
    const savedQuestion = await newQuestion.save();

    console.log(savedQuestion);
    //    find the question specific to the user and return it as a list
    const userSpecificQuestion = await Question.find({ user: email });

    return res.json({ status: "ok", questions: userSpecificQuestion });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", error: "invalid token" });
  }
};

// Fetch questions for a user with a valid token
const FetchQuestionController = async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    // Check if the token is provided
    if (!token) {
      return res.status(401).json({ message: "cannot find the token" });
    }
    const decoded = jwt.verify(token, "secretKey200");

    const email = decoded.email;

    // Fetch the questions from the logged-in user's database
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    const questions = await Question.find({ user: user.email });

    return res.json({ status: "ok", questions: questions });
  } catch {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
};

module.exports = {
  QuestionController,
  FetchQuestionController,
};
