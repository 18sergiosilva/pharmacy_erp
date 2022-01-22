const LogOperacionProducto = require('../models/log');
const LogErroresEjecucion = require('../models/logError');


function logCrearProducto(tipoOperacion, nombreUsuario, idUsuario, nivel, origen, obj){

    try {

        console.log("Crear producto log +---> :: " + obj.nombreUsuario);

        let logOperacion = new LogOperacionProducto({
            log_tipo: tipoOperacion,
            log_nombre_usuario: nombreUsuario,
            log_id_usuario: idUsuario,
            log_nivel_accion: nivel,
            log_origen: origen,
            producto: {
                sku: obj.sku,
                nombre:obj.nombre,
                precio:obj.precio,
                descripcion:obj.descripcion,
                imagen: obj.imagen,
                urlImagen: obj.urlImagen
            }
        });
    
        logOperacion.save();
    }catch (err) {
        console.log("Error Log catch:: " + err);
    }  
}


function logErrores(descripcion, usuario,idUsuario, nivel, origen, obj){

    try {

        if (obj != null){
            console.log("errorSistema +---> :: " + obj.nombre);
            let logError = new LogErroresEjecucion({
                log_descripcion: descripcion,
                log_usuario: usuario,
                log_id_usuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen,
                producto: {
                    sku: obj.sku,
                    nombre:obj.nombre,
                    precio:obj.precio,
                    descripcion:obj.descripcion,
                    imagen: obj.imagen,
                    urlImagen: obj.urlImagen
                }
            });
            logError.save();
        }else{
            console.log("errorSistema +---> :: null");
            let logError = new LogErroresEjecucion({
                log_descripcion: descripcion,
                log_usuario: usuario,
                log_id_usuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen
            });

            logError.save();
        } 
    }catch (err) {
        console.log("ErrorSistema Log catsh:: " + err);
    }  
}

module.exports.logCrearProducto = logCrearProducto;
module.exports.logErrores = logErrores;