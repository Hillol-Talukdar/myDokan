const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

exports.getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.status(200).json(products);
});

exports.getProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({
            message: "Product not found!",
        });
    }
});
