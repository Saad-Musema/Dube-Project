const mongoose = require('mongoose');
const validator = require('validator');

const usersSchema = new mongoose.Schema({
    name: {type: String,
            required: true},
    email: {type: String,required: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: 'Email is invalid'
        }
    },
    phoneNumber: {type: String,required: true},
    address : {type: String,required: true},
    subcity: {type: String,required: true},
    city: {type: String,required: true},
    password: {type : String}
});


module.exports = mongoose.model('user', usersSchema)