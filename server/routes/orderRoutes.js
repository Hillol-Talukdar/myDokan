const express = require("express");
const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, orderController.addOrderItems);
router.route("/:id").get(protect, orderController.getAOrder);

module.exports = router;
