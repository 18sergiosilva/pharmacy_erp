const s3 = require("../config/s3");
var logs = require('../utils/log');

module.exports = {
    borrarImagen: (key) => {
        return new Promise((resolve, reject) => {
            s3.deleteObject({
                Bucket: 'ayd2p11',
                Key: key,
            }, (err, data) => {
                if (err) {
                   // logs.logErrores("Error-S3:: Ocurrio un error al eliminar la imagen msg:: " + err, "Admin","Sistema","servicio eliminar producto");
                    reject(new Error(err));
                } else {
                    resolve(data);
                }
            });
        })
    }
}