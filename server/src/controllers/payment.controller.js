const Payment = require('../model/payments.mongo');


const order = require('../model/order.mongo');
const PaymentPlan = require('../model/plan.mongo');

async function processPayment(body, order) {

try{

    let totalAmount = 0;
    body.items.forEach((product) => {
        totalAmount += product.price;
    })


    const paymentPlan = await PaymentPlan.findOne({durationMonths: body.plan});

    const firstPayment = calculateDownPaymnet(totalAmount, paymentPlan);
    const monthlyPayment = calculateMonthlyAmount(firstPayment, totalAmount,paymentPlan);

    console.log('Total Amount:', typeof paymentPlan.totalAmount);
    console.log('Price Increase Percentage:',typeof paymentPlan.priceIncreasePercentage);
    console.log('Down Payment Percentage:', typeof paymentPlan.downPaymentPercentage);
    console.log('Duration Months:', typeof paymentPlan.durationMonths);
    console.log(body.orderDate);
    const monthlyPaymentsArray = [];

    monthlyPaymentsArray.push({
        month: 0,
        amount:  firstPayment,
        status: 'paid'
    })

    for(let i=1; i<paymentPlan.durationMonths; i++){
        monthlyPaymentsArray.push({
            month: i,
            amount:  monthlyPayment,
            status: 'pending'
        })
    }

    const paymentOrder = await new Payment(
        {user: body.user,
        orderId: order._id,
        amount: totalAmount,
        monthlyPayments: monthlyPaymentsArray,
    })

    await paymentOrder.save();
    console.log(paymentOrder);
}
catch(error){
    console.log(error);
}
}




function calculateDownPaymnet(totalAmount, paymentPlan) {
    var priceIncrease = totalAmount*(paymentPlan.priceIncreasePercentage/100);
    console.log(priceIncrease)
    totalAmount = totalAmount + priceIncrease;
    console.log(totalAmount);
    var firstPayment = totalAmount * (paymentPlan.downPaymentPercentage/100);
    console.log(firstPayment);
    return firstPayment;
}

function calculateMonthlyAmount(firstPayment, totalAmount, paymentPlan){
    var monthlyPayment = (totalAmount - firstPayment) / paymentPlan.durationMonths;
    console.log(monthlyPayment);
    return monthlyPayment;
}


module.exports = processPayment;


