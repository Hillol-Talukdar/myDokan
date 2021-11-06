const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

let __directoryname = path.resolve();
app.use("/uploads", express.static(path.join(__directoryname, "/uploads")));

app.use(notFound);

app.use(errorHandler);

module.exports = app;
