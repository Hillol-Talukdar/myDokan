const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERROR", err));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App running on port: ${port}`));
