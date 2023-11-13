const express = require('express');


const Order = require('../model/order.mongo');
const users = require('../model/user.mongo');


const ordersRouter = express.Router();

let orderNumberCounter = 1000;


ordersRouter.post('/', async (req, res)=>{
  console.log("here");
    // const order = new Order(req.body);
    const orderNumber = `ORD${orderNumberCounter}`
    console.log(orderNumber);
    orderNumberCounter++;
    // const user = await users.findOne({email : order.user});
    console.log(req.body);
   
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

