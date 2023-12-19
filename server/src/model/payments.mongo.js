const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId , 
        ref: 'user',
        required: true
    },

    orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders',
    required: true

    }
    ,
    paymentDate: {
        type: Date,
        default: Date.now,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    plan : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan',
        required: true,
    },

    status : {
        type: String,
        enum: ['paid', 'pending'],
        default: 'pending',
    },

    monthlyPayments: [
        {
            month: {
                type: Number,
                required: true
            },

            dueDate: {
                type: Date,
                required: true
            },

            amount: {
                type: Number,
                required: true
            },

            status: {
                type: String,
                enum: ['paid', 'pending'],
                default: 'pending'
            }
        }
    ]
})


module.exports = mongoose.model('payment', paymentSchema)