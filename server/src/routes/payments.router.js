const express = require('express');


const Payment = require('../model/payments.mongo');

const Order = require('../model/order.mongo');
const User = require('../model/user.mongo');

const paymentRouter = express.Router();

paymentRouter.post('/', async(req, res) => {
    console.log("Called!");
})


// Get All Payments
paymentRouter.get('/', async (req, res) => {
    try {
      const payments = await Payment.find({});
      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving payments');
    }
  });

module.exports = paymentRouter;