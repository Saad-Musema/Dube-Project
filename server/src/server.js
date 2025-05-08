require('dotenv').config();
const process = require('process');
const mongoose = require('mongoose');
const app = require('./app'); // <-- use the proper app

mongoose.connection.once('open', () => {
  console.log('MongoDB connection is ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("Connected to User Database");

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
