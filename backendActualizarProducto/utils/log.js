const LogOperacionProducto = require('../models/log');
const LogErroresEjecucion = require('../models/logError');


function logActualizarProducto(tipoOperacion, nombreUsuario, idUsuario, nivel, origen, obj1, obj2){

    try {

        console.log("test +---> :: actualizando producto ");

        let logOperacion = new LogOperacionProducto({
            log_tipo: tipoOperacion,
            log_nombre_usuario: nombreUsuario,
            log_id_usuario: idUsuario,
            log_nivel_accion: nivel,
            log_origen: origen,
            producto_nuevo: {
                id: obj1.id,
                sku: obj1.sku,
                nombre:obj1.nombre,
                precio:obj1.precio,
                descripcion:obj1.descripcion,
                imagen: obj1.imagen,
                urlImagen: obj1.urlImagen
            },
            producto_anterior: {
                id: obj1.id,
                sku: obj2.sku,
                nombre:obj2.nombre,
                precio:obj2.precio,
                descripcion:obj2.descripcion,
                imagen: obj2.imagen,
                urlImagen: obj2.urlImagen
            }
        });
    
        logOperacion.save();
    }catch (err) {
        console.log("Error Log catch:: " + err);
    }  
}


function logErrores(descripcion, usuario,idUsuario, nivel, origen, obj1, obj2){

    try {

        if (obj1 != null && obj2 != null ){
            console.log("errorSistema +---> ::  con datos producto nuevo y actual");
            
            let logError = new LogErroresEjecucion({
                log_descripcion: descripcion,
                log_usuario: usuario,
                log_id_usuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen,
                producto_nuevo: {
                    id: obj1.id,
                    sku: obj1.sku,
                    nombre:obj1.nombre,
                    precio:obj1.precio,
                    descripcion:obj1.descripcion,
                    imagen: obj1.imagen,
                    urlImagen: obj1.urlImagen
                },
                producto_anterior: {
                    id: obj2.id,
                    sku: obj2.sku,
                    nombre:obj2.nombre,
                    precio:obj2.precio,
                    descripcion:obj2.descripcion,
                    imagen: obj2.imagen,
                    urlImagen: obj2.urlImagen
                }
            });

            logError.save();

        }else if (obj1 != null && obj2 == null ){
            console.log("errorSistema +---> ::  con datos producto nuevo");
            
            let logError = new LogErroresEjecucion({
                log_descripcion: descripcion,
                log_usuario: usuario,
                log_id_usuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen,
                producto_nuevo: {
                    id: obj1.id,
                    sku: obj1.sku,
                    nombre:obj1.nombre,
                    precio:obj1.precio,
                    descripcion:obj1.descripcion,
                    imagen: obj1.imagen,
                    urlImagen: obj1.urlImagen
                }
            });

            logError.save();
        }
        else{
            console.log("errorSistema +---> :: sin datos producto");
            let logError = new LogErroresEjecucion({
                log_descripcion: descripcion,
                log_usuario: usuario,
                log_nivel_accion: nivel,
                log_origen: origen
            });

            logError.save();
        } 
    }catch (err) {
        console.log("ErrorSistema Log catsh:: " + err);
    }  
}

module.exports.logActualizarProducto = logActualizarProducto;
module.exports.logErrores = logErrores;