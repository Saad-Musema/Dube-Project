const express = require('express');
const mongoose = require('mongoose');

const Order = require('../model/order.mongo');
const getNextOrderNumber = require('../controllers/counter.controller');
const { authenticateToken } = require('../controllers/auth.controller');
const processPayment = require('../controllers/payment.controller');

const ordersRouter = express.Router();

// Create new order
ordersRouter.post('/', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderNumber = await getNextOrderNumber(session);
    req.body.orderNumber = `ORD${orderNumber}`;

    const order = new Order(req.body);
    await order.save({ session });

    const paymentResponse = await processPayment(req.body, order); // Make sure this is awaited
    console.log("Payment response:", paymentResponse);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(order);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Get all orders (admin)
ordersRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).send("Server Error");
  }
});

// Get user's own orders
ordersRouter.get('/user', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
});

// Get specific order by orderNumber
ordersRouter.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    console.error("Error finding order:", err);
    res.status(500).json({ error: "Failed to find order" });
  }
});

// Update order status (admin only)
ordersRouter.patch('/:orderNumber', async (req, res) => {
  try {
    const { status } = req.body;
    const { orderNumber } = req.params;

    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber },
      { $set: { status } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// Delete order (user)
ordersRouter.delete('/:orderNumber', async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOneAndDelete({ orderNumber });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).send("Order deleted");
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).send("Error deleting order");
  }
});

module.exports = ordersRouter;
