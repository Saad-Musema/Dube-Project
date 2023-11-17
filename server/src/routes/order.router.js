const express = require('express');


const Order = require('../model/order.mongo');
const users = require('../model/user.mongo');

const {authenticateToken} = require('../controllers/auth.controller');

const ordersRouter = express.Router();

let orderNumberCounter = 1000;


ordersRouter.post('/', authenticateToken, async (req, res)=>{
    const orderNumber = `ORD${orderNumberCounter}`
    req.body.orderNumber = orderNumber;
    orderNumberCounter++;
    try{
        const order = new Order(req.body);
        await order.save(order);
        res.status(201).send(order);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Error while adding product")
    }
});

// ordersRouter.get('/', async(req, res)=>{
//   const 
// })

module.exports = ordersRouter;

