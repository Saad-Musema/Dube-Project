const http = require('http');
const mongoose = require('mongoose')


const MONGO_URL = 'mongodb+srv://admin:dube@users-list.ysfaxez.mongodb.net/?retryWrites=true&w=majority'


const app = require('./app.js')
const PORT = 9000;

const server = http.createServer(app);

mongoose.connection.once('open', ()=> {
    console.log('MongoDB connection is ready!')
})

mongoose.connection.on('error', (err)=>{
    console.error(err);
})


async function startServer(){
    await
        mongoose.connect(MONGO_URL, {
          useUnifiedTopology: true,
          useNewUrlParser: true
        });
        console.log("Connected to User Database");

    server.listen(PORT, ()=> {
        console.log(`Server running on port ${PORT}`);
    })
}

startServer();