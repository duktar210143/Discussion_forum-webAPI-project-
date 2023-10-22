const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://localhost:27017/discussionForum");

app.post("/api/signup", async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    res.json({ status: "ok" });
  } catch {
    res.json({ status: "error", error: "dublicate email" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      // User was found, respond with a success message
      res.json({ status: "ok" });
    } else {
      // User was not found, respond with an error message
      res.status(401).json({ status: "error", error: "User not found" });
    }
  } catch (error) {
    // Handle other errors (e.g., database connection issues)
    res.status(500).json({ status: "error", error: "Server error" });
  }
});

app.listen(1337, () => {
  console.log("server started on 1337");
});
