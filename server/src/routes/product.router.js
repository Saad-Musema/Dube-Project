const express = require('express');


const products = require('../model/product.mongo');


const productRouter = express.Router();


productRouter.post('/', async (req, res)=>{
    const product = new products(req.body);
    try{
        await product.save(product);
        res.status(201).send("Product has been added!")
    }
    catch(error) {
        res.status(400).send("Error while adding product!");
    }
})


module.exports = productRouter;