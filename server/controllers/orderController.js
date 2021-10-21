const asyncHandler = require("express-async-handler");
const Order = require("../models/order");

exports.addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error("No order items");
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

exports.getAOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (order) {
        res.status(200).json(order);
    } else {
        throw new Error("Order not found");
    }
});

exports.updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            // id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            // email_address: req.body.payer.email_address,
            email_address: req.user.email,
        };

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else {
        throw new Error("Order not found");
    }
});

exports.getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json(orders);
});
