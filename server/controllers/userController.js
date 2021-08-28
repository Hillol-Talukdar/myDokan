const asyncHandler = require("express-async-handler");
const genrerateToken = require("../utils/genrerateToken.js");
const User = require("../models/user");

exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null,
        });
    } else {
        // res.status(401).json({
        //     message: "Invalid email or password",
        // });
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
