module.exports = function(app) {

    const eventEmitter = app.get("eventEmitter")
    
    // This event will fire when users logged in, we can execute task 
    // like sending welcome notification or SMS and this will not interfere the main API
    eventEmitter.on('login', function (data) {
        console.log('User logged in ' + data);

        // code to send welcome email

        // code to send welcome sms

        // code to login time in third party analytics

    });
    
};
