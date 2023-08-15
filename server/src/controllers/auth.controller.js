// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcrypt");
var User = require('../model/user.mongo');

async function signup(req, res){
  const userData = req.body;

  const user = new User({
    name: userData.name,
    email:  userData.email, 
  })
}



