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
        sku: {
        type: Number,
        default: null,
        required: false
        },
        nombre: {
            type: String,
            default: null,
            required: false
        },
        precio: {
            type: Number,
            default: null,
            required: false
        },
        descripcion: {
            type: String,
            default: null,
            required: false
        },
        imagen: {
            type: String,
            default: null,
            required: false
        },
        urlImagen: {
            type: String,
            default: null,
            required: false
        },
        required: false
}
});


var LogErroresEjecucion = mongoose.model('logsError', logErroresSchema);
module.exports = LogErroresEjecucion;