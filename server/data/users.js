const bcrypt = require("bcrypt");

const users = [
    {
        name: "Admin",
        email: "admin@g.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Name1",
        email: "name1@g.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        name: "Name2",
        email: "name2@g.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

module.exports = users;
