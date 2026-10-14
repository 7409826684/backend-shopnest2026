const express = require("express");

const router = express.Router();

const addressController = require("../controller/addressController");

// Add Address
router.post("/", addressController.addAddress);

// Get User Address
router.get("/:userId", addressController.getAddresses);

// Update Address
router.put("/:id", addressController.updateAddress);

// Delete Address
router.delete("/:id", addressController.deleteAddress);

module.exports = router;