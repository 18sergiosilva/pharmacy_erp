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

var productos = mongoose.model('productos', productoSchema);

module.exports = productos;