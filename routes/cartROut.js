const express = require("express");
const router = express.Router();

const cartController = require("../controller/cartcontroller");

// Add product to cart
router.post("/", cartController.addToCart);

// Get user's cart
router.get("/", cartController.getCart);

// Update product quantity
router.put("/:productId", cartController.updateCart);

// Remove product from cart
router.delete("/:productId", cartController.removeFromCart);

module.exports = router;