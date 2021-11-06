const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../middleware/authMiddleware");
// const products = require("./data/products");
const router = express.Router();

router
    .route("/")
    .get(productController.getAllProducts)
    .post(
        authController.protect,
        authController.admin,
        productController.createProduct
    );

router
    .route("/:id")
    .get(productController.getProduct)
    .delete(
        authController.protect,
        authController.admin,
        productController.deleteProduct
    )
    .patch(
        authController.protect,
        authController.admin,
        productController.updateProduct
    );

router
    .route("/:id/reviews")
    .post(authController.protect, productController.createProductReview);

// showing products from json file
// router.get("/", (req, res) => {
//     res.json(products);
// });

// router.get("/:id", (req, res) => {
//     const product = products.find((prod) => prod._id === req.params.id);
//     res.json(product);
// });

module.exports = router;
