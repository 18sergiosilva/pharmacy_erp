const LogErroresEjecucion = require('../models/logErrores');
const LogOperacionOrdenes = require('../models/log');



function logOperacionOrden(tipoOperacion,idProducto, nombreUsuario, idUsuario, nivel, origen, obj){

    try {

        console.log("Log servicio +---> :: Ver producto ");
        if (obj != null){
            let logOperacion = new LogOperacionOrdenes({
                log_tipo: tipoOperacion,
                log_id_producto: idProducto,
                log_nombre_usuario: nombreUsuario,
                log_idUsuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen,
                log_productos: obj
            });
        
            logOperacion.save();
        }else{
            console.log("test +---> :: orden with null value");
            let logOperacion = new LogOperacionOrdenes({
                log_tipo: tipoOperacion,
                log_id_producto: idProducto,
                log_nombre_usuario: nombreUsuario,
                log_idUsuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen
            });
        
            logOperacion.save();
        }
        
    }catch (err) {
        console.log("Error Log catch:: " + err);
    }  
}


function logErrores(descripcion, usuario,idUsuario, nivel, origen, obj){

    try {

        if (obj != null){
            console.log("errorSistema +---> :: ");
            let logError = new LogErroresEjecucion({
                log_descripcion: descripcion,
                log_usuario: usuario,
                log_idUsuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen,
            });
            logError.save();
        }else{
            console.log("errorSistema +---> :: with null");
            let logError = new LogErroresEjecucion({
                log_descripcion: descripcion,
                log_usuario: usuario,
                log_idUsuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen
            });

            logError.save();
        } 
    }catch (err) {
        console.log("ErrorSistema Log catch:: " + err);
    }  
}




module.exports.logOperacionOrden = logOperacionOrden;
module.exports.logErrores = logErrores;
