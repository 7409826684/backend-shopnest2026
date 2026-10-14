const Cart = require("../model/Cart");
const Product = require("../model/Product");

// 1. Add Product to Cart
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Check product exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: userId });

        // If cart doesn't exist, create new cart
        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: [
                    {
                        product: productId,
                        quantity: quantity || 1
                    }
                ]
            });

            return res.status(201).json({
                message: "Product added to cart",
                cart
            });
        }

        // Check if product already exists in cart
        const item = cart.items.find( item => item.product.toString() === productId);

        if (item) {
            item.quantity += quantity || 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity || 1
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 2. Get Cart
const getCart = async (req, res) => {
    try {
        const { userId } = req.query;

        const cart = await Cart.findOne({ user: userId })
            .populate("items.product");

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 3. Update Cart Quantity
const updateCart = async (req, res) => {
    try {
        const { userId, quantity } = req.body;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 4. Remove Product from Cart
const removeFromCart = async (req, res) => {
    try {
        const { userId } = req.query;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
};