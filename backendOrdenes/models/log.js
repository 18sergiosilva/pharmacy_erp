const mongoose = require('mongoose');


var detalleSchema = new mongoose.Schema({
    codigo: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});

var ordenSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: false,
        default: "Recoger en Tienda"
    },
    nit: {
        type: String,
        required: false,
        default: -1
    },
    detalle: {
        type: [detalleSchema],
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    estado: {
        type: Number,
        required: true
    },
    tipoPago: {
        type: Number,
        required: false,
        default: 0
    },
    fechaGenerado: {
        type: Date,
        required: false,
        default: new Date()
    },
    fechaEntrega: {
        type:Date,
        required: false,
        default: null
    }
}, {
    timestamps: true
});

var logSchema = new mongoose.Schema({
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
    log_ordenes: {
        type: [ordenSchema],
        required: false
    }
});


var LogOperacionOrdenes= mongoose.model('logs', logSchema);
module.exports = LogOperacionOrdenes;