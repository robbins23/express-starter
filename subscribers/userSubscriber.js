module.exports = function(app) {

    const eventEmitter = app.get("eventEmitter")
    
    eventEmitter.on('login', function (data) {
        console.log('User logged in ' + data);
    });
    
};
