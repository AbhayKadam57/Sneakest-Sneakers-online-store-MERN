const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const userRoutes = require("../api/routes/user.js");
const authRoutes = require("../api/routes/Auth.js");
const productRoutes = require("../api/routes/product.js");
const orderRoutes = require("../api/routes/orders.js");
const sliderRoutes = require("../api/routes/Slider.js");
const cartRoutes = require("../api/routes/cart.js");
const paymentRoutes = require("../api/routes/payment.js");

dotenv.config();

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb is Connected!");
  } catch (error) {
    console.log(error);
  }
};

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/slider", sliderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(8800, () => {
  Connect();
  console.log("Backend sever is started....");
});
