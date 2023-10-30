const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const profileController = async (req, res) => {
  try {
    if (req.file) {
      const token = req.headers["x-access-token"];
      console.log(token);
      if (!token) {
        return res.status(401).json({ error: "Token not provided" });
      }

      try {
        const decoded = jwt.verify(token, "secretKey200");
        const email = decoded.email;

        const user = await User.findOne({ email: email });

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        user.image = req.file.path;
        await user.save();
        return res.json({ status: "ok", profile: user.image });
      } catch (error) {
        console.error("Token Verification Error:", error);
        return res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      return res.status(400).json({ error: "No file uploaded" });
    }
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getProfileController = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    try {
      const decoded = jwt.verify(token, "secretKey200");
      const email = decoded.email;
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.json({ status: "ok", profile: user.image, email: user.email });
    } catch (error) {
      console.error("Token Verification Error:", error);
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  profileController,
  getProfileController,
};
