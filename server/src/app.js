const express = require('express');
const mongoose = require('mongoose')

const usersRoute = require('./routes/user.routes');
const MONGO_URL = 'mongodb+srv://admin:dube@users-list.ysfaxez.mongodb.net/?retryWrites=true&w=majority'
const app = express();

try {
    mongoose.connect(MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("Connected to User Database");
  } catch (error) {
    handle.error(error);
  }

app.use(express.json())
app.use(express.urlencoded({
    extended: true
  }));

app.use(usersRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is live on port 3000");
  })