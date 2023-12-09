const express = require('express');
const helmet = require('helmet');


const usersRouter = require('./routes/user.router');
const productRouter = require('./routes/product.router');
const catagoryRouter = require('./routes/catagory.router');
const ordersRouter = require('./routes/order.router');
const paymentRouter = require('./routes/payments.router');

const app = express();

app.use(helmet());
// const user = require('./model/user.mongo')



app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/catagory', catagoryRouter);
app.use('/orders', ordersRouter);
app.use('/paymnets', paymentRouter)


module.exports = app;


