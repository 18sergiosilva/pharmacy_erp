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
    producto_nuevo: {
        id: {
            type: String,
            required: false
        },
        sku: {
        type: Number,
        required: false
        },
        nombre: {
            type: String,
            required: false
        },
        precio: {
            type: Number,
            required: false
        },
        descripcion: {
            type: String,
            required: false
        },
        imagen: {
            type: String,
            required: false
        },
        urlImagen: {
            type: String,
            required: false
        },
        required: false
    },
    producto_anterior: {
        id: {
            type: String,
            required: false
        },
        sku: {
        type: Number,
        required: false
        },
        nombre: {
            type: String,
            required: false
        },
        precio: {
            type: Number,
            required: false
        },
        descripcion: {
            type: String,
            required: false
        },
        imagen: {
            type: String,
            required: false
        },
        urlImagen: {
            type: String,
            required: false
        },
        required: false
    }
});


var LogErroresEjecucion = mongoose.model('logsError', logErroresSchema);
module.exports = LogErroresEjecucion;