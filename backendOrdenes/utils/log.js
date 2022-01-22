const LogErroresEjecucion = require('../models/logErrores');
const LogOperacionOrdenes = require('../models/log');
const LogOperacionOrdenesModificar = require('../models/logMod');



function logOperacionOrden(tipoOperacion,idOrden, nombreUsuario, idUsuario, nivel, origen, obj){

    try {

        console.log("test +---> :: orden ");
        if (obj != null){
            let logOperacion = new LogOperacionOrdenes({
                log_tipo: tipoOperacion,
                log_id_orden: idOrden,
                log_nombre_usuario: nombreUsuario,
                log_idUsuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen,
                log_ordenes: obj
            });
        
            logOperacion.save();
        }else{
            console.log("test +---> :: orden with null value");
            let logOperacion = new LogOperacionOrdenes({
                log_tipo: tipoOperacion,
                log_id_orden: idOrden,
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


function obtenerOrden(idOrden){

    var ordenDB = {};

    ordenes.findById(idOrden).then(orden => {
       
        ordenDB = orden;
        console.log("orden--> " + ordenDB);
        //return ordenDB;
    }).catch(err => {

        console.log("orden--> no existe orden");
    })

}


function logOperacionOrdenModificar(tipoOperacion,idOrden, nombreUsuario, idUsuario, nivel, origen, obj1,obj2){

    try {

        console.log("Operacion modificar orden +---> :: orden ");
    
            let logOperacion = new LogOperacionOrdenesModificar({
                log_tipo: tipoOperacion,
                log_id_orden: idOrden,
                log_nombre_usuario: nombreUsuario,
                log_idUsuario: idUsuario,
                log_nivel_accion: nivel,
                log_origen: origen,
                log_estado_orden_anterior: obj1,
                log_estado__orden_actual: obj2
            });
        
            logOperacion.save();
        
    }catch (err) {
        console.log("Error Log catch:: " + err);
    }  
}

module.exports.logOperacionOrden = logOperacionOrden;
module.exports.logErrores = logErrores;
module.exports.obtenerOrden = obtenerOrden;
module.exports.logOperacionOrdenModificar = logOperacionOrdenModificar;