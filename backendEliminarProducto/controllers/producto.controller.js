const modelProducto = require('../models/producto.model');
const { borrarImagen } = require("../utils/s3.utils");
var logs = require('../utils/log');

module.exports = {
    eliminar: (req, res) => {
        const idProducto = req.params.id;
        console.log(idProducto);
        
        var obj = {
            id: idProducto
        };
        
        //var id = req.params.id;
        var usuario = "noLogin";
        var idUsuario = "noLogin";
        //var orden = {};
        //console.log("idUsuarioi --> " + req.headers.idusuario);
        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;

        modelProducto.findByIdAndRemove(idProducto).then(producto => {
            if (producto) {
                borrarImagen(producto.urlImagen).then(data => {
                    logs.logEliminarProducto("Eliminar Producto", usuario,idUsuario,"Admin","servicio eliminar producto", obj);
                    return res.send({
                        mensaje: "Producto eliminado exitosamente"
                    })
                }).catch(err => {
                    console.log(err);
                    logs.logErrores("Error:: Ocurrio un error al eliminar la imagen msg:: " + err, usuario,idUsuario,"Sistema","servicio eliminar producto", obj);
                    return res.status(500).send({
                        mensaje: "Ocurrio un error al eliminar la imagen"
                    })
                })

                
            } else {
                logs.logErrores("Error-Eliminar:: No existe producto con id " + idProducto, usuario,idUsuario,"Usuario","servicio eliminar producto", obj);
                return res.status(404).send({
                    mensaje: "No existe producto con id " + idProducto
                })
            }
        })
    }
}