require("dotenv").config();
const app = require("./app");
const connectDb = require("./config/db");

connectDb();

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App running on port: ${port}`));
