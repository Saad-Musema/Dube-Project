const Payment = require('../model/payments.mongo');


const order = require('../model/order.mongo');
const PaymentPlan = require('../model/plan.mongo');

async function processPayment(body, order, session) {
    try {
        // Calculate total amount based on product prices
        let totalAmount = 0;
        body.items.forEach((product) => {
            totalAmount += product.price;
        });

        // Retrieve payment plan based on the specified duration
        const paymentPlan = await PaymentPlan.findOne({ durationMonths: body.plan }, {}, { session });

        // Calculate first payment and monthly payment
        const firstPayment = calculateDownPayment(totalAmount, paymentPlan);
        const monthlyPayment = calculateMonthlyAmount(firstPayment, totalAmount, paymentPlan);

        // Generate an array representing monthly payments
        const monthlyPaymentsArray = [];

        monthlyPaymentsArray.push({
            month: 0,
            amount: firstPayment,
            status: 'paid',
        });

        let date = new Date();

        // Generate monthly payment entries
        for (let i = 1; i < paymentPlan.durationMonths; i++) {
            let dueDate = new Date(date);
            dueDate.setMonth(date.getMonth() + i);

            monthlyPaymentsArray.push({
                month: i,
                dueDate: dueDate,
                amount: monthlyPayment,
                status: 'pending',
            });
        }

        // Create a paymentOrder object
        const paymentOrder = await new Payment(
            {
                user: body.user,
                orderId: order._id,
                amount: totalAmount,
                monthlyPayments: monthlyPaymentsArray,
            },
            { session }
        );

        // Save the paymentOrder to the database
        await paymentOrder.save({ session });

        console.log('Payment Order Saved:', paymentOrder);
    } catch (error) {
        console.error('Error in processPayment:', error);
        // Propagate the error or handle it as needed
        throw error;
    }
}






function calculateDownPayment(totalAmount, paymentPlan) {
    var priceIncrease = totalAmount*(paymentPlan.priceIncreasePercentage/100);
    totalAmount = totalAmount + priceIncrease;
    var firstPayment = totalAmount * (paymentPlan.downPaymentPercentage/100);
    return parseFloat(firstPayment.toFixed(2));
}

function calculateMonthlyAmount(firstPayment, totalAmount, paymentPlan){
    var monthlyPayment = (totalAmount - firstPayment) / paymentPlan.durationMonths;
    return parseFloat(monthlyPayment.toFixed(2));
}


module.exports = processPayment;


