require('dotenv').config();
const process = require('process');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { parsePhoneNumberFromString } = require('libphonenumber-js');

const User = require('../model/user.mongo');

const usersRouter = express.Router();

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// REGISTER USER
usersRouter.post('/', async (req, res) => {
  try {
    const { email, password, phoneNumber, ...rest } = req.body;

    // Check for existing user
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: "User with this email already exists." });
    }

    // Validate phone number
    const parsedPhone = parsePhoneNumberFromString(phoneNumber, 'ET');
    if (!parsedPhone || !parsedPhone.isValid()) {
      return res.status(400).json({ error: "Invalid phone number." });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Password must include lowercase, uppercase, number, and special character." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate refresh token
    const userPayload = { email }; // Don't store password or PII here
    const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      phoneNumber: parsedPhone.number,
      refreshToken,
      ...rest
    });

    await user.save();
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// LOGIN USER
usersRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: "Email incorrect." });
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({ error: "password incorrect." });
    }

    // Generate access token
    const userPayload = { id: user._id, email: user.email };
    const accessToken = generateAuthToken(userPayload);

    // Store token (if using token list logic)
    await User.updateOne(
      { _id: user._id },
      { $push: { tokens: { token: accessToken } } }
    );

    res.status(200).json({
      access_token: accessToken,
      refresh_token: user.refreshToken
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Generate access token
function generateAuthToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

module.exports = usersRouter;
