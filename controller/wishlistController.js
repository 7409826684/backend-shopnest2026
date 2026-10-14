const Wishlist = require("../model/wishlist");
const Product = require("../model/Product");

// Add Product to Wishlist
const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Find wishlist
        let wishlist = await Wishlist.findOne({ user: userId });

        // If wishlist doesn't exist
        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                products: [productId]
            });

            return res.status(201).json({
                message: "Product added to wishlist",
                wishlist
            });
        }

        // Check product already exists
        if (wishlist.products.includes(productId)) {
            return res.status(400).json({
                message: "Product already in wishlist"
            });
        }

        wishlist.products.push(productId);

        await wishlist.save();

        res.status(200).json({
            message: "Product added to wishlist",
            wishlist
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get Wishlist
const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({
            user: req.params.userId
        }).populate("products");

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found"
            });
        }

        res.status(200).json(wishlist);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Remove Product from Wishlist
const removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const wishlist = await Wishlist.findOne({
            user: userId
        });

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found"
            });
        }

        wishlist.products = wishlist.products.filter(
            id => id.toString() !== productId
        );

        await wishlist.save();

        res.status(200).json({
            message: "Product removed from wishlist",
            wishlist
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist
};