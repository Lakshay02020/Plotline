const router = require("express").Router();
const Order = require('../Models/orderModel');
const { getUser } = require("../Services/auth");
const Product = require("../Models/productModel");

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
        user.orders.push(saved_order._id);
        console.log(saved_order);
        user.cart = [];
        await user.save(); 
        console.log(user);
        res.render("order") 
})

router.get("/myOrders", async (req, res) => {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);

    if (!user) {
        return res.status(404).json({ message: "User not authenticated" });
    }

    const order_ids = user.orders;
    const orders = await Promise.all(order_ids.map(async (orderId) => {
        const order = await Order.findById(orderId);
        const items = await Promise.all(order.items.map(async (item) => {
            const product = await Product.findById(item.itemId);
            return {product, quantity: item.quantity};
        }));
        return { order, items };
    }));

    console.log(orders);

    res.render("myOrders", { orders: orders });
});




// router.get("/getOrders", async(req,res) =>{
//     const userUid = req.cookies?.uid;
//     const user = getUser(userUid);
//     if(!user){
//         res.status(404).json({ message: "User not authenticated"});
//     }
//     const orders = await Order.find({user_id: user._id});
//     res.send(orders);
// })
module.exports = router;