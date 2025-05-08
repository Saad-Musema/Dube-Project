const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./routes/auth.router');
const usersRouter = require('./routes/user.router');
const productRouter = require('./routes/product.router');
const catagoryRouter = require('./routes/catagory.router');
const ordersRouter = require('./routes/order.router');
const paymentRouter = require('./routes/payments.router');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/category', catagoryRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentRouter);

module.exports = app;
