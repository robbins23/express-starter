const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const events = require('events');
const fileUpload = require('express-fileupload');

const PORT = 8080  // PORT where your node server will run
const dev = process.env.NODE_ENV !== 'production'
const app = express();


if(dev){
    // loading environment variable from different path in case of dev server
	require('dotenv').config({path : path.resolve(process.cwd(), '.env.development.local')})

    // Allow api call from any origin on dev 
	app.use(cors())
	app.options('*', cors())

    //Enable logs in dev environment
    app.use(morgan('dev'));
}else{
    //loading environment variable from default file '.env'
	require('dotenv').config()

    //disabling all console.logs in prod environment
	console.log = function () {};

    // Allow api call only from trusted website on production, in this case it will be your app server(react/ angular) url
	// var whitelist = ['https://google.com']
	var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
		    callback(null, true)
		} else {
		    callback(new Error('Not allowed by CORS'))
		}
	}
	}
	app.use(cors())
	app.options(corsOptions, cors()) 
}


// middleware js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.

//loading middlewares
const errorMiddlewares = require('./middlewares/error');
const apiResponseMiddleware = require('./middlewares/response');
const authMiddleware = require('./middlewares/auth');


//loading db config values
const dbConfig = require('./config/db');


// connecting with mongo db with mongoose, this will connect your server with mongo database
(async () => {
    try {
        await mongoose.connect(dbConfig.url, dbConfig.options);
        console.log("db connected")
    } catch (err) {
      console.log('error: ' + err)
    }
})()

// safely disconnecting db when server is stopped
process.on('SIGINT', () => {
    mongoose.disconnect().then(() => {
    	console.log("exit")
        process.exit();
    });
});


// helmet helps you secure your Express apps by setting various HTTP headers 
app.use(helmet());

// used to parse the incoming requests with JSON payloads and is based upon the bodyparser
app.use(express.json());

// used for uploading file
app.use(fileUpload());


//adding response middleware to structure all API responses in specific format
app.use(apiResponseMiddleware());


//adding auth middleware to check if user token is valid or not before running protected apis
app.all('*', authMiddleware.checkAuthToken)


//adding all api routes to app
const v1 = require('./api');
app.use('/', v1)

//adding error middleware that will return error message incase of server error
app.use(errorMiddlewares.notFound);
app.use(errorMiddlewares.errorHandler);


// Setting single event-emitter instance applicationwide
// access it inside any routes by req.app.get('eventEmitter')
const eventEmitter = new events.EventEmitter();
app.set('eventEmitter', eventEmitter);

// loading all event subscribers
require('./subscribers')(app);


// loading schedulers aka all cron jobs to be in this file
require('./schedulers');


//starts a server and listens on port [3000] for connections.
app.listen(PORT, () => {
    console.log(`Listening: http://localhost:${PORT}`);
});

module.exports = app;