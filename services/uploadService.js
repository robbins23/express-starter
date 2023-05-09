const _ = require('lodash')
var AWS = require('aws-sdk')
const awsConfig = require('../config/aws');


module.exports ={

    updloadSingleFileToS3: async(req, res) => {
        const s3 = new AWS.S3({
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccesskey,
            AWS_S3_FILE_OVERWRITE : false
        });

        // Binary data base64
        let {data, name } = req.files.file
        let workspaceId = "testworkspace"

        const fileContent  = Buffer.from(data, 'binary');
        let key = `workspace/${workspaceId}/${new Date().getTime()}${name}` // File name you want to save as in S3
        const dev = process.env.NODE_ENV !== 'production'
        if(dev){
            key = `dev/workspace/${workspaceId}/${new Date().getTime()}${name}` // File name you want to save as in S3
        }

        const params = {
            Bucket: awsConfig.bucketName,
            Key: key,
            Body: fileContent
        };
    
        // Uploading files to the bucket
        s3.upload(params, function(err, data) {
            if (err) {
                return res.apiError("File upload failed!")
            }
            return res.apiSuccess({imageUrl : data.Location})
        });
    },

}