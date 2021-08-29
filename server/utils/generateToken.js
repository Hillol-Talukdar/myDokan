const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECET, {
        expiresIn: process.env.JWT_SECET_EXPIRESIN,
    });
};

module.exports = generateToken;
