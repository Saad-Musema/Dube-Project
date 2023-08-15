const express = require('express')
const router = require('express').Router()

const {
    signup
} = require('../controllers/auth.controller')


router.post('/register', signup)


module.exports = router;