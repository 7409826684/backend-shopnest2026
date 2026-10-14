const Order = require("../model/Order");


// Create Order
const createOrder = async (req, res) => {
    try {

        const order = await Order.create(req.body);

        res.status(201).json({
            message: "Order created successfully",
            order: order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// Get All Orders
const getOrders = async (req, res) => {
    try {

        const orders = await Order.find();

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// Get Single Order
const getOrderById = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json(order);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.orderStatus = req.body.orderStatus;

        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order: order
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
};