const express = require("express");
const orderController = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router
    .route("/")
    .post(protect, orderController.addOrderItems)
    .get(protect, admin, orderController.getAllOrders);

router.route("/myorders").get(protect, orderController.getMyOrders);
router.route("/:id").get(protect, orderController.getAOrder);
router.route("/:id/pay").patch(protect, orderController.updateOrderToPaid);
router
    .route("/:id/deliver")
    .patch(protect, orderController.updateOrderToDelivered);

module.exports = router;
