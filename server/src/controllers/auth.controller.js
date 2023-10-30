// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcrypt");

const User = require('../model/user.mongo');

async function signup(req, res){
  const userData = req.body;

  const user = new User({
    name: userData.name,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    address: userData.address,
    subcity: userData.subcity,
    city: userData.city,
    password: userData.password,
  })

  return res.status(201).json(user);
}


async function signin(req, res){
  return await res.status(200).json(await getUserData());
}




module.exports = {signup, signin};