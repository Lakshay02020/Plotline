const router = require('express').Router();
const upload = require('../multer')
const Product = require('../Models/productModel')

router.get('/create', async (req, res) => {
    res.render('admin.ejs');
});

router.post('/create', upload.single('image'), async (req, res) => {
    console.log(req.body); // Product details
    console.log("File Details: ")
    console.log(req.file); // Uploaded file details
  
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      ratings: req.body.ratings,
      path: "images/uploads/" + req.file.filename // Use req.file to get the uploaded file
    });
  
    console.log(newProduct);
  
    try {
      const savedProduct = await newProduct.save();
      res.json({ message: "Success", product: savedProduct });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
  });

module.exports = router;