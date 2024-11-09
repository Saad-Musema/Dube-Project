const express = require('express');

const Catagory = require('../model/catagory.mongo');


const catagoryRouter = express.Router();



catagoryRouter.post('/', async(req, res)=>{
    const catagory = new Catagory(req.body);
    try{
        await catagory.save(catagory);
        console.log("Here!")
        console.log(catagory);
        res.status(200).send(catagory);
    }
    catch(error){
        console.log(error);
        res.json(400).send("Error while creating new Catagory");
    }
})

module.exports = catagoryRouter;
