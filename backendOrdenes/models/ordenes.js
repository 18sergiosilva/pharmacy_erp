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

var ordenes = mongoose.model('ordenes', ordenSchema);

module.exports = ordenes;