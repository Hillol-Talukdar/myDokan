const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log("DB CONNECTED");
    } catch (err) {
        console.log("DB CONNECTION ERROR", err);
    }
};

module.exports = connectDb;
