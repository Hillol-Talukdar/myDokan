const asyncHandler = require("express-async-handler");
const Product = require("../models/product");

exports.getAllProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: "i", // i for case insensitive
              },
          }
        : {};

    const products = await Product.find({ ...keyword });

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
    // const product = new Product({
    //     name: req.body.name,
    //     price: req.body.price,
    //     user: req.user._id,
    //     image: req.body.image,
    //     brand: req.body.brand,
    //     category: req.body.category,
    //     countInStock: req.body.countInStock,
    //     numReviews: req.body.numReviews,
    //     description: req.body.description,
    // });

    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
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

exports.createProductReview = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }

        const review = {
            name: req.user.name,
            rating: Number(req.body.rating),
            comment: req.body.comment,
            user: req.user._id,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;

        await product.save();

        res.status(201).json({
            message: "Review added",
        });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});
