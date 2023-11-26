const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Question = require("../models/Question.model");

const editUserQuestions = async (req, res) => {

  try {
    // Get the token from the request headers
    const token = req.headers["x-access-token"];

    // Check if the token is provided
    if (!token) {
      return res.status(400).json({ message: "Token not provided" });
    }

    // Decode the token to retrieve the user's email
    const decoded = jwt.verify(token, "secretKey200");

    // Get the email from the decoded token
    const email = decoded.email;

    // Find the logged-in user
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    // Get the question ID from the request body
    const questionId = req.body.questionId;

    // Find the question by ID
    const question = await Question.findOne({ _id: questionId });

    // Check if the question exists
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Return the question in the response
    return res.json({ status:"ok", question });
  } catch (error) {
    console.error("Error editing user questions:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {editUserQuestions};
