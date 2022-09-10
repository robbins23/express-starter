// Config file for mongo db to connect via mongoose library

var config = {
    url : process.env.MONGO_URL,
    options : {useNewUrlParser: true,  useUnifiedTopology: true}
};

module.exports = config
