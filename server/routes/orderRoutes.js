const express = require("express");
const orderController = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(protect, orderController.addOrderItems);
router.route("/:id").get(protect, orderController.getAOrder);
router.route("/:id/pay").get(protect, orderController.updateOrderToPaid);

module.exports = router;
