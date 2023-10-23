const User = require('../models/user.model');

const createUser = async (req, res) => {
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
};


module.exports = {
    createUser,
}