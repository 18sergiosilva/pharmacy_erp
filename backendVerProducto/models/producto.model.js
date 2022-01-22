const mongoose = require('mongoose');

var productoSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});

productoSchema.index({ nombre: 'text' });

var productos = mongoose.model('producto', productoSchema);

module.exports = productos;