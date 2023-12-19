const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const Order = require('../model/order.mongo');
const users = require('../model/user.mongo');

const paymnet = require('../model/payments.mongo');

const getNextOrderNumber = require('../controllers/counter.controller')
const {authenticateToken} = require('../controllers/auth.controller');

const processPayment = require('../controllers/payment.controller');

const ordersRouter = express.Router();




ordersRouter.post('/', async (req, res) => {
    let session;

    session = await mongoose.startSession();

    try {
        console.log("here")
        session.startTransaction();
        console.log("GOt here")


        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

        // getNextOrderNumber
        

        await session.withTransaction(async (err) => {
            if(err){
                throw(error);
            }
            console.log("GOt here")
            const orderNumber = await getNextOrderNumber(session);
            console.log(orderNumber);

            req.body.orderNumber = `ORD${orderNumber}`;
            req.body.orderDate = Date.now();
            const order = new Order(req.body);
            await order.save({ session });

            // const paymentResponse = await processPayment(req.body, order, session);
        });

        await session.commitTransaction();
        res.status(201).send(order);

    } catch (error) {

        await session.abortTransaction();
        console.error('Transaction aborted:', error);
        res.status(500).send("Error while adding product");

    }finally{

        session.endSession();
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

ordersRouter.patch('/:orderNumber', async (req, res) => {
    try {
        const { orderNumber } = req.params;
        const { status } = req.body;

        console.log(orderNumber);


        const updateOrder = await Order.findOneAndUpdate(
            { orderNumber: orderNumber },
            { $set: { status: status } },
            { new: true } // Return the updated document
        );

        if (!updateOrder) {
            return res.status(404).send("Order not found");
        }

        console.log(updateOrder);
        res.status(200).json(updateOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating order status");
    }
});





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

