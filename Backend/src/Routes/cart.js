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
    try {
      // Check if the item is already in the cart
      const existingItem = user.cart.find(item => item.itemId === itemId);

      if (existingItem) {
          existingItem.quantity++;
      } else {
          user.cart.push({ itemId, quantity: 1 });
      }

      console.log("Cart Items: ", user.cart);

      // Update the user's cart in the database
      await User.findOneAndUpdate({ username: user.username }, { cart: user.cart });

      res.redirect("/productRoutes");
  } catch (err) {
      console.error("Error adding item to cart:", err);
      res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/deleteCartItem", async (req, res) => {
    const userUid = req.cookies?.uid;
    console.log(req.body);
    const user = getUser(userUid);
    const itemId = req.body.itemId;
    const item = await Product.findById(itemId);
    if(!user){
        res.status(404).json({ message: "User not authenticated"});
    }
    const itemIndex = user.cart.findIndex(item => item.id === itemId);
    user.cart.splice(itemIndex, 1);
    await user.save();
    res.redirect("/cart"); 
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
      res.render("checkout", { cartItems: cartItems });
    }
    // res.render("checkout")
});
module.exports = router;
