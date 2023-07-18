const Router = require("express").Router();
const Order = require("../models/order");

Router.post("/", async (req, res) => {
  const order = new Order(req.body);

  try {
    const newOrder = await order.save();

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
});

Router.put("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

Router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json("Order is deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

Router.get("/find/:userID", async (req, res) => {
  try {
    const order = await Order.findOne({ userID: req.params.userID });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

Router.get("/", async (req, res) => {
  try {
    const order = await Order.find();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
});

Router.get("/income", async (req, res) => {
  const date = new Date();

  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));

  const PrevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  console.log(PrevMonth);
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: PrevMonth } } },

      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },

      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = Router;
