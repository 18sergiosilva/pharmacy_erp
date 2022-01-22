const mongoose = require('mongoose');

var logSchema = new mongoose.Schema({
    log_tipo: {
        type: String,
        required: true
    },
    log_nombre_usuario: {
        type: String,
        default: null,
        required: false
    },
    log_id_usuario: {
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
    producto: {
        id: {
            type: String,
            required: false
        },
        required: false
    }
});


var LogOperacionProducto = mongoose.model('logs', logSchema);
module.exports = LogOperacionProducto;