const express = require("express");

const router = express.Router();

const wishlistController = require("../controller/wishlistController");

// Add Product to Wishlist
router.post("/", wishlistController.addToWishlist);

// Get Wishlist
router.get("/:userId", wishlistController.getWishlist);

// Remove Product from Wishlist
router.delete("/:userId/:productId", wishlistController.removeFromWishlist);

module.exports = router;