const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        // res.status(401).json({
        //     message: "Invalid email or password",
        // });
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

exports.signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExits = await User.findOne({ email });

    if (userExits) {
        res.status(400);
        throw new Error("User already exits");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found!");
    }
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
    if (req.body.password) {
        const password = await bcrypt.hash(req.body.password, 12);
        req.body.password = password;
    }

    delete req.body.isAdmin; // removes isAdmin attribute from body

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
    });

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

exports.getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({});

    res.status(200).json(users);
});

exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

exports.updateUser = asyncHandler(async (req, res) => {
    // delete req.body.password;

    // if (req.body.password) {
    //     const password = await bcrypt.hash(req.body.password, 12);
    //     req.body.password = password;
    // }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    if (!user) {
        res.status(404);
        throw new Error("User not found!");
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    });
});

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();

        res.status(200).json({
            message: "user removed",
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});
