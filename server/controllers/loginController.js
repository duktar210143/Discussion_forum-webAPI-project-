const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (passwordMatch) {
        // create a JWT token
        const token = jwt.sign({
          email:user.email
        },
        "secretKey200"
        );
        console.log(token)
        // User was found, respond with a success message and send the jwt signed token
        return res.json({ status: "ok", user:token });
      }else{
        // password do not match respond with an error message
        return res.status(401).json({ status: "error", error: "Invalid password" });
      }
    } else {
      // User was not found, respond with an error message
      return res.status(401).json({ status: "error", error: "User not found" });
    }
  } catch (error) {
    // Handle other errors (e.g., database connection issues)
    return res.status(500).json({ status: "error", error: "Server error" });
  }
};

module.exports = { loginUser };
