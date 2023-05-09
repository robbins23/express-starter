var express = require('express');
const app = express();


const userRoute = require('./user');
const publicRoute = require('./public');
const uploadRoute = require('./upload');



app.use('/user', userRoute)
app.use('/public', publicRoute)
app.use('/upload', uploadRoute)

module.exports = app;
