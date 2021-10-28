const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../middleware/authMiddleware");
const router = express.Router();

router
    .route("/")
    .get(
        authController.protect,
        authController.admin,
        userController.getAllUser
    );

router.post("/login", userController.login);
router.post("/signup", userController.signup);

router
    .route("/profile")
    .get(authController.protect, userController.getUserProfile)
    .patch(authController.protect, userController.updateUserProfile);

router
    .route("/:id")
    .delete(
        authController.protect,
        authController.admin,
        userController.deleteUser
    );

module.exports = router;
