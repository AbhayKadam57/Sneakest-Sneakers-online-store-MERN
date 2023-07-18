const Router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();

// create Order

console.log(process.env.RAZORPAY_KEY_ID);

Router.post("/order", (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        return res.status(401).json({ message: "Something went wrong..." });
      }

      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error...." });
  }
});

// verify order details

Router.post("/verify", (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHash("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSignature) {
      return res
        .status(200)
        .json({ message: "Payment verified successfully..." });
    } else {
      return res
        .status(500)
        .json({ message: "Payment verfication is failed..." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error..." });
  }
});

module.exports = Router;
