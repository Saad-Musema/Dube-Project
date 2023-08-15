const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: {type: String,
            required: true},
    email: {type: String,      
}});


module.exports = mongoose.model('user', usersSchema)