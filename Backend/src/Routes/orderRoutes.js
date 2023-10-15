const router = require("express").Router();
const Order = require('../Models/orderModel');
const { getUser } = require("../Services/auth");

router.post("/createOrder", async(req,res) =>{
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    if(!user){
        res.status(404).json({ message: "User not authenticated"});
    }
    console.log(user)
    const data = req.body;
    console.log(data);

    const order = new Order(
        {
            user_id: user._id,
            items: user.cart,
            amount: data.totalPrice,
            pincode: data.pincode,
            address: data.address,
            paymentMethod: data.paymentMethod
        }
        )
        const saved_order = await order.save();
        console.log(saved_order);
        user.cart = [];
        await user.save(); 
        res.render("order")
})
module.exports = router;