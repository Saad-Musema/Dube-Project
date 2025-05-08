const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category',
        required: true
    },
    
    price: { type: Number, required: true },
    image: { type: String, required: true },
    stock: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('product', productSchema);