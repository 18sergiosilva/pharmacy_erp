const s3 = require("../config/s3");

module.exports = {
    subirImagen: (screenshot, name) => {
        return new Promise((resolve, reject) => {
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
    },
    borrarImagen: (key) => {
        return new Promise((resolve, reject) => {
            s3.deleteObject({
                Bucket: 'ayd2p11',
                Key: key,
            }, (err, data) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(data);
                }
            });
        })
    }
}