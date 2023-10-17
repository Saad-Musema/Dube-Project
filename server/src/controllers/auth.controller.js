// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcrypt");
var User = require('../model/user.mongo');

async function signup(req, res){
  const userData = req.body;

  const user = await new User({
    name: userData.name,
    email:  userData.email, 
  })

  return res.status(201).json(user);
}

async function getUserData(req, res){
  return await User.find({} , {
    '_id' : 0, '__v': 0
}); 
}

async function signin(req, res){
  return await res.status(200).json(await getUserData());
}




module.exports = {signup, signin};