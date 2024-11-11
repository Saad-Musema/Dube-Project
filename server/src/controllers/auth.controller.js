require('dotenv').config();

const process = require('process')

var jwt = require("jsonwebtoken");


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


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  const refreshToken = authHeader && authHeader

  console.log(refreshToken)
  
  if (token === null || token === undefined) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if(err){
      if (err.name == 'TokenExpiredError') {
        console.log(err.name);
        
        
        return res.status(403).send("Token Expired");
      }
    }

    req.user = user;
    console.log(user);
    next();
  });
}

// function getUserId(req, res, next){

// }




// async function signin(req, res){
//   return await res.status(200).json(await getUserData());
// }




module.exports = {signup, authenticateToken};