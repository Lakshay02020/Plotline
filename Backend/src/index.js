const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const productRoutes = require('./Routes/productRoutes');
const Product = require('./Models/productModel');
const userRoutes = require('./Routes/user');

const User = require('./Models/userModel');
const DataBase = require('./database');

const { restrictToLoggedinUserOnly } = require('./Middlewares/auth');

// DataBase
DataBase("mongodb://127.0.0.1:27017/Plotline").then(() => {
  console.log("Database connected");
});

// Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/user', userRoutes);
app.use('/productRoutes', restrictToLoggedinUserOnly, productRoutes);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
