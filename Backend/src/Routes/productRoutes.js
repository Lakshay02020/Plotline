const express = require('express')
const router = express.Router()
const Product = require('../Models/productModel')

//User
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        console.log(products);
        res.render('home.ejs', { products });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;