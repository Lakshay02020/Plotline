const express = require("express");
const router = express.Router();
const { getUser } = require("../Services/auth");
const Product = require("../Models/productModel");
router.get("/", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

router.get("/product", (req, res) => {
  return res.render("home");
});

router.get("/cart", async (req, res) => {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  if (!user) {
    res.status(404).json({ message: "User not authenticated" });
  }
  try {
    const cartItems = await Promise.all(
      user.cart.map(async (productId) => {
        const cartItem = await Product.findById(productId); // Assuming your Cart model has findById method
        return cartItem;
      })
    );

    console.log(cartItems);
    res.render("cart", { cartItems: cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
