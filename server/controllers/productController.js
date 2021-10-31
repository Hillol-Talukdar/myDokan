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

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();

        res.status(200).json({
            message: "Product removed",
        });
    } else {
        res.status(404).json({
            message: "Product not found!",
        });
    }
});

exports.createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        user: req.user._id,
        image: req.body.image,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countInStock,
        numReviews: req.body.numReviews,
        description: req.body.description,
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
});

exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;

        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});
