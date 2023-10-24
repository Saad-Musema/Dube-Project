const express = require('express');


const usersRouter = require('./routes/user.router');
const productRouter = require('./routes/product.router');

const app = express();
// const user = require('./model/user.mongo')



app.use(express.json());
app.use('/users', usersRouter);
app.use('/products', productRouter);


module.exports = app;


