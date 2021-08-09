const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/products", productRoutes);

module.exports = app;
