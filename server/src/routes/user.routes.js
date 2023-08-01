const express = require('express')

const {
    signup
} = require('../controllers/auth.controller')


router.post('register', signup,(req, res) => {

})


module.exports = router;