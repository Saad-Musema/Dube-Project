const express = require('express');
const bcrypt = require('bcrypt');
const libphonenumber = require('libphonenumber-js');
const path = require('path');


//From the models directory
const User = require('../model/user.mongo');

//local Variables
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const usersRouter = express.Router();

const {
    signup,
    signin
} = require('../controllers/auth.controller')


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


    if (!isPasswordValid(user.password)) {
    console.log("Password is valid");
    return res.status(409).send("Password is Invalid! Please Include special charater, lowercase, uppercase and number")
    }

    try {
        await user.save(user);
        res.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});


// router.post('/users/login', async (req, res) => {
//     try {
//         const user = await User.findByCredentials(req.body.email, req.body.password)
//         const token = await user.generateAuthToken()
//         res.send({ user, token})
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

usersRouter.post('/:login', async(req, res)=>{
    
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.send("User with this Email doesn't exist!")
        }
        let result = await bcrypt.compare(req.body.password, user.password)
            if(!result){
                return res.send("Password not correct!")
            }
        res.send(user);
    } catch (error) {
        console.log(error);
       return  res.status(500).send('User not Found!');
    }
});



module.exports = usersRouter;