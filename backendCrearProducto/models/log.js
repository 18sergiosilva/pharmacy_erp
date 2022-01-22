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
        sku: {
        type: Number,
        required: true
        },
        nombre: {
            type: String,
            required: true
        },
        precio: {
            type: Number,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        urlImagen: {
            type: String,
            required: true
        },
        required: false
}
});


var LogOperacionProducto = mongoose.model('logs', logSchema);
module.exports = LogOperacionProducto;