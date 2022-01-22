let s3 = require('../private/s3_aws').s3;
var productos = require('../models/productos');

let uploadS3File = function (screenshot, name) {
    return new Promise((resolve, reject) => {
        //throw new Error('something bad happened when uploading image  123456');
        var screenshotName = '';
        var screenshotBody = null;
        var uploadParams = null;
        screenshotName = `products/${name}.${screenshot.substring(screenshot.indexOf('/') + 1, screenshot.indexOf(';base64'))}`;
        screenshotBody = Buffer.from(screenshot.split(",")[1], 'base64');
        uploadParams = {
            Bucket: 'ayd2p11',
            Key: screenshotName,
            Body: screenshotBody,
            ACL: 'public-read',
        };
        s3.upload(uploadParams, (error, data) => {
            if (error) {
                err = new Error(error);
                err.status = 404;
                reject(err);
            } if (data) {
                resolve(data);
            }
        });
    });
}

let existeProducto = function(sku){
    return new Promise((resolve, reject) => {
        productos.findOne({'sku':sku},(err, prod)=>{
            if(err){
                reject(err);
            }
            else{
                if(prod==null){
                    resolve(false);
                }
                else{
                    resolve(true);
                }
            }
        });
    });
}

module.exports.uploadS3File = uploadS3File;
module.exports.existeProducto = existeProducto;