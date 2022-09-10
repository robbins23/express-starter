
module.exports = function(app) {

    // loading subscribers related to user events
    require('./userSubscriber')(app)

};
