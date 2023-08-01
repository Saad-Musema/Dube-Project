const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {type: String,
            required: true},
    email: {type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
          validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
          },
          message: '{VALUE} is not a valid email!'},

    password: {type: String,
        required: true,
        min: 8},

    phoneNumber: {type: Number,
        required: true},

    Address: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
      }
}})


module.exports = mongoose.model('user', usersSchema)