const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product name cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    path: {
        type: String,
        required: [true, 'Please enter product location'],
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Exporting the Product model.... Product name is the name of the model used in all places
const Product = mongoose.model('Product', productSchema);
module.exports = Product;