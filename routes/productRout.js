const express = require("express");
const router = express.Router();
const productController = require("../controller/productcontroller");
const upload = require("../middlewere/upload");

// 1. Product add (form-data, image field ka naam: "image")
router.post("/", upload.single("image"), productController.createProduct);

// 2. Sab products dikhao
router.get("/", productController.getProducts);

// 3. Ek product dikhao
router.get("/:id", productController.getProductById);

// 4. Product update (nayi image optional)
router.put("/:id", upload.single("image"), productController.updateProduct);

// 5. Product delete
router.delete("/:id", productController.deleteProduct);

module.exports = router;
