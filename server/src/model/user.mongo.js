const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
    password: {type : String, required: true},
    tokens: [{
        token: {
            type: String,
        }
    }],
    refreshToken: {type: String}
});



usersSchema.pre('save', async function(next) {const user = this
    if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
 }
   next()
 })

module.exports = mongoose.model('user', usersSchema)