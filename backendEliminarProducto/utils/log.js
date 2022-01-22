const LogOperacionProducto = require('../models/log');
const LogErroresEjecucion = require('../models/logError');


function logEliminarProducto(tipoOperacion, nombreUsuario, idUsuario, nivel, origen, obj){

    try {

        console.log("taest +---> :: " + obj.id);

        let logOperacion = new LogOperacionProducto({
            log_tipo: tipoOperacion,
            log_nombre_usuario: nombreUsuario,
            log_id_usuario: idUsuario,
            log_nivel_accion: nivel,
            log_origen: origen,
            producto: {
                id: obj.id
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
            console.log("errorSistema +---> :: " + obj.id);
            let logError = new LogErroresEjecucion({
                log_descripcion: descripcion,
                log_usuario: usuario,
                log_id_usuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen,
                producto: {
                    id: obj.id
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

module.exports.logEliminarProducto = logEliminarProducto;
module.exports.logErrores = logErrores;