const http = require('http');
const mongoose = require('mongoose')


const mongo_uri = process.env.MONGO_URL



const app = require('./app.js')
const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

mongoose.connection.once('open', ()=> {
    console.log('MongoDB connection is ready!')
})

mongoose.connection.on('error', (err)=>{
    console.error(err);
})


async function startServer(){
    try {await mongoose.connect(mongo_uri, {
          useUnifiedTopology: true,
          useNewUrlParser: true
        });
        console.log("Connected to User Database");

    server.listen(PORT, ()=> {
        console.log(`Server running on port ${PORT}`);
    })}

    catch(error) {
        console.error(error);
    }
}

startServer();
