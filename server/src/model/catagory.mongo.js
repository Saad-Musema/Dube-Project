const mongoose = require('mongoose');
const product = require('./product.mongo');

const catagorySchema = new mongoose.Schema({
    name : {type: String},
    description: {type: String},
    products: [
        { type: mongoose.Schema.Types.ObjectId, 
        ref: 'product'}
    ]
})

const catagory = mongoose.model('catagory', catagorySchema)

module.exports = mongoose.model('catagory', catagorySchema);