const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const productRout = require('./routes/productRout')
const cartRout = require('./routes/cartROut')
const orderRout = require("./routes/orderRout")
const ReviewRout = require('./routes/ReviewRout')
const wishlistRout = require("./routes/wishlistRout")
const addressRout = require('./routes/addressRout')

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json()); // needed to parse JSON request bodies
app.use(express.urlencoded({ extended: true }));

// Uploaded images ko browser mein dikhane ke liye
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.send("ShopNest backend is working properly!");
});


app.use("/api/auth", authRoutes);

// product rout
app.use("/api/products", productRout);

// cart rout
app.use('/api/cart', cartRout);

// order rout
app.use('/api/order', orderRout);

// Review rout
app.use('/api/review', ReviewRout);

// wishlist
app.use('/api/wishlist', wishlistRout);

// address Rout
app.use('/api/address', addressRout);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});