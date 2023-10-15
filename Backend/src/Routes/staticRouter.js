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

    const cartItems = await Promise.all(
      user.cart.map(async ({ itemId, quantity }) => {
        try {
          const product = await Product.findById(itemId);
          return { product, quantity };
        } catch (error) {
          console.error("Error fetching product:", error);
          return null;
        }
      }) 
    );
 
    const validCartItems = cartItems.filter(item => item !== null);

    console.log("Cart items:", validCartItems); 
    return res.render("cart", { cartItems: validCartItems });
}); 

module.exports = router;
 