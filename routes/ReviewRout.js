const express = require("express");

const router = express.Router();

const reviewController = require("../controller/ReviewController");


// Add Review
router.post("/", reviewController.createReview);

// Get Reviews
router.get("/:productId", reviewController.getReviews);

// Delete Review
router.delete("/:id", reviewController.deleteReview);


module.exports = router;