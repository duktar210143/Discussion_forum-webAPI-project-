const User = require("../models/User.model");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    await User.find({
      email: req.body.email,
    })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "user already exist",
          });
        } else {
          bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
              res.status(500).json({
                error: err,
              });
            } else {
              const user = await new User({
                email: req.body.email,
                password: hash,
              });
              user.save().then((result) => {
                res.status(200).json({
                  status: "ok",
                  result: "User Created",
                  user: result,
                });
              });
              console.log(user)
            }
          });
        }
      });
  } catch {
    (err) => {
      res.status(500).json({
        error: err,
      }),
        console.log(err);
    };
  }
};

module.exports = {
  createUser,
};
