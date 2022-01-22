const mongoose = require('mongoose');


var logModificarSchema = new mongoose.Schema({
    log_tipo: {
        type: String,
        required: true
    },
    log_id_orden: {
        type: String,
        default: null,
        required: false
    },
    log_nombre_usuario: {
        type: String,
        default: null,
        required: false
    },
    log_idUsuario: {
        type: String,
        default: null,
        required: false
    },
    log_nivel_accion: {
        type: String,
        required: true
    },
    log_origen: {
        type: String,
        required: true
    },
    log_fecha: {
        type: Date, 
        default: Date.now
    },
    log_estado_orden_anterior: {
        type: String,
        default: null,
        required: false
    },
    log_estado__orden_actual: {
        type: String,
        default: null,
        required: false
    },
});


var LogOperacionOrdenesModificar= mongoose.model('logsMod', logModificarSchema);
module.exports = LogOperacionOrdenesModificar;