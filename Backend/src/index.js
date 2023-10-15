const express = require('express');
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser');

const productRoutes = require('./Routes/productRoutes');
const Product = require('./Models/productModel');
const userRoutes = require('./Routes/user');
const staticRoute = require("./Routes/staticRouter");
const cartRoutes = require('./Routes/cart');
const orderRoutes = require('./Routes/orderRoutes');

const User = require('./Models/userModel');
const DataBase = require('./database');

const { restrictToLoggedinUserOnly } = require('./Middlewares/auth');

// DataBase
DataBase("mongodb+srv://lakshay02singla:vyAhmuQ9PmWaKMTQ5@cluster0.0cuekve.mongodb.net/Plotline").then(() => {
  console.log("Database connected");
});

// View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'Static')))
// app.use('/static', express.static(path.join(__dirname, 'Static')))

//Routes
app.use('/order', orderRoutes)
app.use("/", staticRoute);
app.use('/user', userRoutes);
// restrictToLoggedinUserOnly
app.use('/productRoutes', productRoutes);
app.use('/cart', cartRoutes);
// app.use('/productRoutes',  productRoutes);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
 