require('dotenv').config();
// const { url } = require('inspector');
const mongoose = require('mongoose');

function connectDB(){
    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify : true });

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("db connected");
})
}

module.exports = connectDB;