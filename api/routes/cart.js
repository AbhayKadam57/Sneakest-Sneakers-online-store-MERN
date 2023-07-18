const Router = require("express").Router();
const Cart = require("../models/cart");

Router.post("/", async (req, res) => {
  const oldCart = await Cart.findOne({ username: req.body.username });

  if (!oldCart) {
    try {
      const cart = new Cart(req.body);
      const savedCart = await cart.save();

      return res.status(200).json(savedCart);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(200).json(oldCart);

    const updatedCart = await Cart.findOneAndUpdate(
      { username: { $in: req.body.username } },
      { $push: { products: req.body.products } },
      { new: true }
    );

    res.status(200).json(updatedCart);
  }
});

Router.put("/:username", async (req, res) => {
  try {
    const order = await Cart.findOneAndUpdate(
      { username: { $in: req.params.username } },
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
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json("Cart is deleted..");
  } catch (error) {
    res.status(500).json(error);
  }
});

Router.get("/", async (req, res) => {
  try {
    const Carts = await Cart.find();

    res.status(200).json(Carts);
  } catch (error) {
    res.status(200).json(error);
  }
});

Router.get("/find/:id", async (req, res) => {
  try {
    const Carts = await Cart.findOne({ useID: { $in: req.params.id } });

    res.status(200).json(Carts);
  } catch (error) {
    res.status(200).json(error);
  }
});

module.exports = Router;
