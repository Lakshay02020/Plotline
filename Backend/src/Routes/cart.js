const express = require("express");
const router = express.Router();
const { getUser } = require("../Services/auth");
const User = require("../Models/userModel");
const Product = require("../Models/productModel");

router.get("/", async (req, res) => {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    if(!user){
        res.status(404).json({ message: "User not authenticated"});
        try {
            const cartItems = await Promise.all(user.cart.map(async productId => {
                const cartItem = await Product.findById(productId);  // Assuming your Cart model has findById method
                return cartItem;
            }));
            
            console.log(cartItems)
            // Render the cart page with the cart items
            res.render("cart", { cartItems: cartItems });
        } catch (error) {
            console.error("Error fetching cart items:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }}
});

router.post("/addCartItems", async (req, res) => {
    const { itemId } = req.body;
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    if(!user){
        res.status(404).json({ message: "User not authenticated"});
    }
    try{
        user.cart.push(itemId);
        console.log("Cart Items: " + user.cart);
        await User.findOneAndUpdate({ username: user.username }, { cart: user.cart });
    }
    catch(err){
        console.log(err);
    }
    res.redirect("/productRoutes")
});

router.post("/deleteCartItem", async (req, res) => {
    const userUid = req.cookies?.uid;
    console.log(req.body);
    const user = getUser(userUid);
    console.log(user);
    if(!user){
        res.status(404).json({ message: "User not authenticated"});
    }
    console.log(user.cart);
    await User.findOneAndUpdate({ username: user.username }, { cart: [] });
    console.log(user.cart);
});

router.post("/clear", async (req, res) => {
  const info = await User.updateOne(
    { username: req.body.username },
    { cart: [] }
  );
  if (info.acknowledged) {
    const data = await User.findOne({ username: req.body.username });
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Error to update" });
  }
});

router.post("/checkout", async (req, res) => {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    if (!user) {
      res.status(404).json({ message: "User not authenticated" });
    }
    else{
    try {
      const cartItems = await Promise.all(
        user.cart.map(async (productId) => {
          const cartItem = await Product.findById(productId); // Assuming your Cart model has findById method
          return cartItem;
        })
      );
  
      console.log(cartItems);
      res.render("checkout", { cartItems: cartItems });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }}
    // res.render("checkout")
});
module.exports = router;
