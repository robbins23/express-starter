// Config file for mongo db to connect via mongoose library

var config = {
    accessKeyId : process.env.AWS_KEY,
    secretAccesskey : process.env.AWS_SECRET_KEY,
    bucketName : process.env.AWS_BUCKET_NAME,
};

module.exports = config
