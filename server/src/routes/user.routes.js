const express = require('express')
// const router = require('express').Router()
const usersRouter = express.Router()

const {
    signup,
    signin
} = require('../controllers/auth.controller')


usersRouter.post('/register', signup);
usersRouter.get('/signin', signin)


module.exports = router;