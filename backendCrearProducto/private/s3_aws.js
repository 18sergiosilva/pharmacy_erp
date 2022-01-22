var AWSS3 = require('aws-sdk');
AWSS3.config.update({
    accessKeyId: 'AKIAT7QCJ5FEAZE6QE2O', 
    secretAccessKey: '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', 
    region: 'us-east-2'
});
var s3 = new AWSS3.S3();
exports.s3 = s3;