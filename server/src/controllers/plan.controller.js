const paymentPlan = require('../model/plan.mongo');


const threeMonthsPlan = new paymentPlan({
    name: '3-Month Plan',
    durationMonths: 3,
    priceIncreasePercentage: 7,
  });
  
  const sixMonthsPlan = new paymentPlan({
    name: '6-Month Plan',
    durationMonths: 6,
    priceIncreasePercentage: 14,
  });
  
  const tenMonthsPlan = new paymentPlan({
    name: '10-Month Plan',
    durationMonths: 10,
    priceIncreasePercentage: 21,
  });
  

threeMonthsPlan.save();
sixMonthsPlan.save();
tenMonthsPlan.save();