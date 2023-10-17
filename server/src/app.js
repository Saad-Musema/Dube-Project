const express = require('express');


// const usersRoute = require('./routes/user.routes');

const app = express();
const user = require('./model/user.mongo')



app.use(express.json())

const usersRouter = express.Router()

// const {
//     signup
// } = require('../controllers/auth.controller')

async function signup(req, res){
  // const userData = req.body;

  // var newUser = new user({
  //   name: userData.name,
  //   email: userData.email,
  // })

  // const user = new user({
  //   name: userData.name,
  //   email: userData.email,
  // })
  await user.create({
    name: 'Test Testerson',
    email: 'testtest@gmail.com'
  });


  // newUser.save((err, user)=> {
  //   if(err) return console.error(err);
  //   console.log(`${user} added to collection`)
  // })

  return res.status(201).json(user);
}


app.post('/register', signup)


// app.use(usersRoute);
