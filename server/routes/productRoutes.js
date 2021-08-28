const express = require("express");
const productController = require("../controllers/productController");
// const products = require("./data/products");
const router = express.Router();

router.route("/").get(productController.getAllProducts);
router.route("/:id").get(productController.getProduct);

// showing products from json file
// router.get("/", (req, res) => {
//     res.json(products);
// });

// router.get("/:id", (req, res) => {
//     const product = products.find((prod) => prod._id === req.params.id);
//     res.json(product);
// });

module.exports = router;
