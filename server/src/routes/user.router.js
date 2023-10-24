const express = require('express');


//From the models directory
const User = require('../model/user.mongo');

const usersRouter = express.Router();

const {
    signup,
    signin
} = require('../controllers/auth.controller')


usersRouter.post('/', async(req, res)=>{
    const user = new User(req.body)
    try {
        await user.save(user);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send("This is my error")
    }
});

usersRouter.get('/', async(req, res)=>{
    try {
        const users = await User.find({});
        console.log(users);
       return res.status(200).json(users);
    } catch (error) {
       return  res.status(500).json({ error: 'Internal server error' });
    }
})



module.exports = usersRouter;