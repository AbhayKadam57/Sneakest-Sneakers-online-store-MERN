const Router = require("express").Router();

const User = require("../models/User");

const jwt = require("jsonwebtoken");

const CryptoJS = require("crypto-js");

const dotenv = require("dotenv");

dotenv.config();

Router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.Secrete_key),
  });

  try {
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

Router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(500).json("User is not found!...");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.Secrete_key
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(500).json("Password is not valid....");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
