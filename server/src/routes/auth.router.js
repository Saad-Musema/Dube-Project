require('dotenv').config();
const process = require('process');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.mongo');
const { signup, signin, authenticateToken } = require('../controllers/auth.controller');

const authRouter = express.Router();

// Sign up route
authRouter.post('/signup', signup);

// Sign in route
authRouter.post('/signin', signin);

// Protected route example
authRouter.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = authRouter; 