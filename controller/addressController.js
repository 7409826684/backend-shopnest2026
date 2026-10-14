const Address = require("../model/address");

// 1. Add Address
const addAddress = async (req, res) => {
    try {
        const address = await Address.create(req.body);

        res.status(201).json({
            message: "Address added successfully",
            address: address
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 2. Get User Addresses
const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({
            user: req.params.userId
        });

        res.status(200).json(addresses);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 3. Update Address
const updateAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after"
            }
        );

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        res.status(200).json({
            message: "Address updated successfully",
            address: address
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// 4. Delete Address
const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        res.status(200).json({
            message: "Address deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress
};