const express = require('express');
const mongoose = require('mongoose');

const Order = require('../model/order.mongo');
// const users = require('../model/user.mongo');

// const paymnet = require('../model/payments.mongo');

const getNextOrderNumber = require('../controllers/counter.controller')
const {authenticateToken} = require('../controllers/auth.controller');

const processPayment = require('../controllers/payment.controller');

const ordersRouter = express.Router();




ordersRouter.post('/', async (req, res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    // getNextOrderNumber
    const orderNumber = await getNextOrderNumber(session);
    console.log(orderNumber);

    req.body.orderNumber = `ORD${orderNumber}`;
    // orderNumberCounter++;
    console.log(req.body.items[0]);
    try{
        const order = new Order(req.body);
        await order.save(order, { session });
        console.log(order);
        const paymentResponse = processPayment(req.body, order);

        console.log(paymentResponse);
        req.t
        await session.commitTransaction();
        session.endSession();
        // await order.save(order);
        res.status(201).send(order);
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();

        console.log(error.message);
        res.status(500).send("Error while adding product")
    }
});


ordersRouter.get('/all', async(req, res)=>{
    try{const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error")
    }
  
});

//Orders get request for a user to get his own orders

ordersRouter.get('/user', authenticateToken, async(req, res)=>{
    try{
        const orders = await Order.find({user: req.user})
        res.status(400).json(orders);
    }
    catch(err){
        console.log(err);
    }

})


//GraphQL API to get some part of the product detail for the product catalog page



//To get specific order

ordersRouter.get('/:orderNumber', async(req, res)=>{
    try{
        const order = await Order.findOne({orderNumber: req.params.orderNumber});
        res.status(201).json(order);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error finding order!")
    }
})

//Get order history of users



//Apply discount codes

//Update(use patch) orders request for admins to update the status of a given order

ordersRouter.patch('/:orderNumber', async(req, res)=>{
    try{
        const status = req.body.status;
        console.log(status);
        const orderNumber = req.params.orderNumber;
        console.log(orderNumber);
        const updateOrder = await Order.findOneAndUpdate(
            { orderNumber: orderNumber },
            { $set: { status: status } });

        if (!updateOrder) {
            return res.status(404).send("Order not found");
          }
          console.log(updateOrder);
        // order.status = status;
        console.log(updateOrder);
        // await order.save();
        res.status(200).json(updateOrder);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error finding order!");
    }
})




//Update(use put method) orders request for users to change their requests with some time limit as to when




//Delete orders request from user

ordersRouter.delete('/:orderNumber', async (req, res) => {
    try {
      const orderNumber = req.params.orderNumber;
  
      const order = await Order.findOneAndDelete({ orderNumber: orderNumber });
  
      if (!order) {
        return res.status(404).send("Order not found");
      }
  
      console.log(order);
      res.status(200).send("Order deleted");
    } catch (err) {
      console.log(err);
      res.status(500).send("Error deleting order");
    }
  });
  

module.exports = ordersRouter;

