const Router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

const {
  verifyToken,
  verifyTokenAndAuthorize,
  verifyAdmin,
} = require("../routes/verifyToken");

Router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.Secrete_key
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    updatedUser.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("user is deleted successfully from DB..");
  } catch (err) {
    res.status(500).json(err);
  }
});

Router.get("/", verifyAdmin, async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
});

Router.get("/stats", async (req, res) => {
  const date = new Date();

  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const Data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },

      { $project: { month: { $month: "$createdAt" } } },

      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]).sort({ _id: 1 });

    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = Router;
