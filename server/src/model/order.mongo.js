const mongoose = require('mongoose');




const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Reference to the User model for associating orders with users
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model for each ordered item
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending'],
    default: 'pending',
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  shippingFee: Number,
  orderNotes: String,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
