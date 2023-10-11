const express = require("express");
const router = express.Router();
const { getUser } = require("../Services/auth");

router.get("/signup", (req, res) => {
    return res.render("signup");
  });

router.get("/login", (req, res) => {
    return res.render("login");
  });

router.get("/product", (req, res) => {
    return res.render("home");
  });

router.get("/cart", (req, res) => {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  if(!user){
      res.status(404).json({ message: "User not authenticated"});
  }
  req.user = user;
  console.log("Routing to cart")
  res.render("cart",{cartItems:user.cart});
  });
  
module.exports = router;
