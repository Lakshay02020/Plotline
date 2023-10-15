const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    items: {
        type: [{ itemId: String, quantity: Number }],
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "cancelled"],
        default: "pending",
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
