const mongoose = require("mongoose");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/user");
const Product = require("./models/product");
const Order = require("./models/order");
const connectDb = require("./config/db");
require("dotenv").config();

connectDb();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data imported!");
        process.exit();
    } catch (error) {
        console.log("Error occured while importing data", error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data destryed!");
        process.exit();
    } catch (error) {
        console.log("Error occured while destroying data", error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
