const User = require("../models/user.model");

const loginUser = async (req, res) => {
  console.log("this login reached");
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
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
};

module.exports = { loginUser };
