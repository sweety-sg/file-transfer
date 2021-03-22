
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
app.set('port', (process.env.PORT || 3000));
const connectDB = require('./config/db')
connectDB();
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use('/api/files' , require('./routes/files'));
app.use('/files', require('./routes/show'));

app.use('/files/download' , require('./routes/download'));

app.use(express.static('frontend'));

app.listen(PORT, ()=>{
 console.log("hi, listening on port 3000");
})
