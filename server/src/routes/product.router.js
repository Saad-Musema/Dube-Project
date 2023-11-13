const express = require('express');


const products = require('../model/product.mongo');
const catagories = require('../model/catagory.mongo');

const {authenticateToken} = require('../controllers/auth.controller');


const productRouter = express.Router();


productRouter.post('/', async (req, res)=>{
    const product = new products(req.body);
    const type = product.type;
    if(await products.findOne({PSN: product.PSN})){
        return res.status(500).send("Product with this PSN already exists!");
    }
    const catagory = await catagories.findOne({name : type});
    if(!catagory){
        console.log("Catagory Not Found!");
        res.status(500).send("Catagory not found!");
    }
    product.catagory = catagory._id;

    try{
        await product.save(product);
        res.status(201).send("Product has been added!")
    }
    catch(error) {
        console.log(error);
        res.status(400).send("Error while adding product!");
    }
})

productRouter.get('/', authenticateToken ,async (req, res)=>{
    try{
        (req, res);
        const product = await products.find({});
        console.log(product);
        return res.status(200).json(product);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Server Error"});
    }
})

productRouter.get('/:type', async (req, res)=>{
    const type = req.params.type;
    const typeId = await catagories.findOne({name: type});
    if(!typeId){
        return res.status(404).send("Catagory not found!");
    }
    try{
        res.status(200).send(await products.find({catagory: typeId}))
    }
    catch(error){
        console.log(error);
        res.status(500).send("Error with type");
    }
})

productRouter.get('/:type/:psn', async (req, res)=>{
    const productId = req.params.psn;
    const product = await products.findOne({PSN: productId});
    if(!product){
        return res.status(404).send("Product Doesn't Exist!");
    }
    try{
        res.status(200).send(product);
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Product Not Found!")
    }
})



module.exports = productRouter;