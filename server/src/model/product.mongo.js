const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required:true},
    description: {type: String,  required:true},
    catagory: {type: String},
    price: {type: Number},
    PSN: {type: Number}
})

module.exports = mongoose.model('product', productSchema)