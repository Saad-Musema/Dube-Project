const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {type: String, required:true},
    description: {type: String,  required:true},
    catagory: { 
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'catagory'},
    price: {type: Number},
    type : {type : String},
    PSN: {type: Number}
})

module.exports = mongoose.model('product', productSchema)