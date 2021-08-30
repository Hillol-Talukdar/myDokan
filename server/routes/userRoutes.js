const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/profile", authController.protect, userController.getUserProfile);

module.exports = router;
