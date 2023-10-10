const express = require('express')
const router = express.Router()
const Product = require('../Models/productModel')
 
//User
router.get('/', async(req, res) => {
    const products = await Product.find()
    res.json(products)
});

//Admin
router.post('/create', async(req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        ratings: req.body.ratings
    })
    
    const savedProduct = await newProduct.save()
    res.json(savedProduct)
})

module.exports = router;