const express = require("express");
const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
// const products = require("./data/products");
const router = express.Router();

router.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await Product.find({});

        res.json(products);
    })
);

router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({
                message: "Product not found!",
            });
        }
    })
);

// showing products from json file
// router.get("/", (req, res) => {
//     res.json(products);
// });

// router.get("/:id", (req, res) => {
//     const product = products.find((prod) => prod._id === req.params.id);
//     res.json(product);
// });

module.exports = router;
