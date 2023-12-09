const mongoose = require('mongoose');

const paymentPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  durationMonths: {
    type: Number,
    required: true,
  },
  priceIncreasePercentage: {
    
  },
  downPaymentPercentage: {
    type: Number,
    required: true,
  }
});

const paymentPlan = mongoose.model('PaymentPlan', paymentPlanSchema);

module.exports = paymentPlan;



  


