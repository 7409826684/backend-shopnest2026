const express = require("express");

const router = express.Router();

const {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} = require("../controller/orderControlle");


// Create Order
router.post("/", createOrder);

// Get All Orders
router.get("/", getOrders);

// Get Single Order
router.get("/:id", getOrderById);

// Update Order Status
router.put("/:id", updateOrderStatus);


module.exports = router;