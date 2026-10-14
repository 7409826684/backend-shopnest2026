const Review = require("../model/review");

// Add Review
const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);

        res.status(201).json({
            message: "Review added successfully",
            review: review
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Get Product Reviews
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            product: req.params.productId
        });

        res.status(200).json(reviews);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Delete Review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        res.status(200).json({
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createReview,
    getReviews,
    deleteReview
};