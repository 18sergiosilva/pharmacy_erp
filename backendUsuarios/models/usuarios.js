const mongoose = require('mongoose');

var usuarioSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: false
    },
    tipoUsuario:{
        type:Number,
        required: true
    }
}, {
    timestamps: true
});

var usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarios;