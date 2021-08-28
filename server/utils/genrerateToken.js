const jwt = require("jsonwebtoken");

exports.genrerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECET,{
        expiresIn:  process.env.JWT_SECET_EXPIRESIN
    });
};
