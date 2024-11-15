require('dotenv').config();

const express = require('express');
const bcrypt = require('bcrypt');
const libphonenumber = require('libphonenumber-js');
// const path = require('path');
const jwt = require('jsonwebtoken');
const process =  require('process')


//From the models directory
const User = require('../model/user.mongo');

//local Variables
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const usersRouter = express.Router();

// const {
//     signup,
//     signin
// } = require('../controllers/auth.controller')


usersRouter.post('/', async(req, res)=>{
    const user = new User(req.body);
    if( await User.findOne({email: user.email})){
        return res.status(409).send("User with this Email already exists");
    }

    user.phoneNumber = libphonenumber.parsePhoneNumber(user.phoneNumber, 'ET').number;
    if(!libphonenumber.isValidPhoneNumber(user.phoneNumber)){

        console.log("Not Valid Phone Number");
        return res.status(409).send("Invalid Phone Number");
    }


    function isPasswordValid(password) {
        return passwordRegex.test(password);
}


    const userData = user

    if (!isPasswordValid(user.password)) {
    console.log("Password is valid");
    return res.status(409).send("Password is Invalid! Please Include special charater, lowercase, uppercase and number")
    }

    try {
        const refresh_token = jwt.sign(userData, process.env.refresh_token);
        user.refreshToken = refresh_token;
        await user.save(user);
        res.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});


usersRouter.post('/:login', async(req, res)=>{
    
    try {

        const user = await User.findOne({email: req.body.email});
        console.log(user);
        if(!user){
            return res.send("Password and Email don't match!")
        }

        let result = await bcrypt.compare(req.body.password, user.password)
            if(!result){
                return res.status(403).send("Password and Email don't match!")
            }
        const userData = {username: user._id}
        const access_token = generateAuthToken(userData);
        await User.updateOne(
            { _id: user._id },
            { $push: { tokens: { token: access_token } } }
          );
          console.log(user)
        
        res.json({access_token: access_token});
    } catch (error) {
        console.log(error);
       return  res.status(500).send('User not Found!');
    }
});

// usersRouter.post('/:token', async(req, res)=>{
//     const refresh_token = req.body.token;
    
// })

//Flag user request for admins to flag given users for abnoraml behaviours

//User data update

//Change password





function generateAuthToken(userData){
    return jwt.sign(userData, process.env.ACCESS_TOKEN, { expiresIn: '1 hr' });
}


module.exports = usersRouter;