const Router = require("express").Router();

const Product = require("../models/product.js");

// Create Product

Router.post("/", async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Product

Router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    updatedProduct.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All product

Router.get("/", async (req, res) => {
  const New = req.query.new;

  const qCategory = req.query.category;

  try {
    let products;

    if (New) {
      products = await Product.find().sort({ updatedAt: -1 });
    } else if (qCategory) {
      products = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      products = await Product.find().sort({ updatedAt: 1 });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete product

Router.get("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json("Product is deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

Router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = Router;
