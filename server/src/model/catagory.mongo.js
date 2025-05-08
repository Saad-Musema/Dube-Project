const mongoose = require('mongoose');
// const product = require('./product.mongo');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    products: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'product'
        }
    ],
    isFeatured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

// const catagory = mongoose.model('catagory', catagorySchema)

module.exports = mongoose.model('category', categorySchema);