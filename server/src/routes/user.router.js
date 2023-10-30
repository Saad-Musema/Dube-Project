const express = require('express');
const bcrypt = require('bcrypt');


//From the models directory
const User = require('../model/user.mongo');

//local Variables


const usersRouter = express.Router();

const {
    signup,
    signin
} = require('../controllers/auth.controller')


usersRouter.post('/', async(req, res)=>{
    const user = new User(req.body);
    if( await User.findOne({email: user.email})){
        console.log(User.find({email: user.email}));
        console.log("User with this Email already exists");
        return res.status(409).send("User with this Email already exists");
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
        });
    });
   
    try {
        await user.save(user);
        res.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
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