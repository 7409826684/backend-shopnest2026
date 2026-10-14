const Product = require("../model/product");

// 1. Create Product
const createProduct = async (req, res) => {
    try {
        // Upload ki hui image ho to uska path, warna body mein diya hua URL
        const image = req.file
            ? `uploads/${req.file.filename}`
            : req.body.image;

        const product = await Product.create({ ...req.body, image });

        res.status(201).json({
            message: "Product created successfully",
            product: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 2. Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 3. Get Single Product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 4. Update Product
const updateProduct = async (req, res) => {
    try {
        const updates = { ...req.body };

        // Nayi image aayi ho tabhi image badlo
        if (req.file) {
            updates.image = `uploads/${req.file.filename}`;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 5. Delete Product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};