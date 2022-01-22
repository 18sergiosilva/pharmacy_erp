const mongoose = require('mongoose');

var logErroresSchema = new mongoose.Schema({
    log_descripcion: {
        type: String,
        required: true
    },
    log_usuario: {
        type: String,
        default: "",
        required: false
    },
    log_idUsuario: {
        type: String,
        default: "",
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
    }
});


var LogErroresEjecucion = mongoose.model('logsError', logErroresSchema);
module.exports = LogErroresEjecucion;