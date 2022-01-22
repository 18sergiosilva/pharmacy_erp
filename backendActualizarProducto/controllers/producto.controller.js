const modelProducto = require('../models/producto.model');
const { borrarImagen, subirImagen } = require("../utils/s3.utils");
var logs = require('../utils/log');

module.exports = {
    actualizar: (req, res) => {
        const idProducto = req.params.id;
        const { nombre, precio, descripcion, imagen } = req.body;
        var update = {};

        //console.log("id --> "+ idProducto);
        //console.log("nombre --> "+ nombre);

        var usuario = "noLogin";
        var idUsuario = "noLogin";

        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;

        var productoActual = {
            id:"",
            sku:"",
            nombre:"",
            precio:"",
            descripcion:"",
            imagen:"",
            urlImagen:""
        };

        var productoActualizado = {
            id:"",
            sku:"",
            nombre:"",
            precio:"",
            descripcion:"",
            imagen:"",
            urlImagen:""
        };

        productoActualizado.id = idProducto;
        if (nombre){
            update.nombre = nombre;
            productoActualizado.nombre = nombre;
        } 
        if (precio){
            update.precio = precio;
            productoActualizado.precio = precio; 
        } 
        if (descripcion){
            update.descripcion = descripcion;
            productoActualizado.descripcion = descripcion;
        } 

        

        modelProducto.findById(idProducto).then(producto => {
            if (producto) {
                //console.log(producto);
                productoActual = producto;
                //console.log("variable -->" +productoActual);

                if (imagen) {
                    console.log("modificando imagen --->");
                    borrarImagen(producto.urlImagen).then(data => {
                        subirImagen(imagen, producto.sku).then(imagen => {
                            //console.log(imagen);
                            update.imagen = imagen.Location;
                            update.urlImagen = imagen.Key;
                            
                            productoActualizado.imagen = imagen.Location;
                            productoActualizado.urlImagen = imagen.Key;

                            modelProducto.findByIdAndUpdate(idProducto, update).then(producto => {
                                logs.logActualizarProducto("Actualizar producto", usuario,idUsuario,"Admin","servicio actualizar producto", productoActualizado, productoActual);
                                return res.send({
                                    mensaje: "Producto actualizado exitosamente"
                                });
                            })
                        }).catch(err => {
                            logs.logErrores("Error:: Ocurrio un error al subir la nueva imagen", usuario,idUsuario,"Sistema","servicio actualizar Producto",productoActualizado);
                            console.log(err);
                            return res.status(500).send({
                                mensaje: "Ocurrio un error al subir la nueva imagen"
                            })
                        })
                    })
                        .catch(err => {
                            logs.logErrores("Error:: Ocurrio un error al eliminar la imagen anterior", usuario,idUsuario,"Sistema","servicio actualizar Producto",productoActualizado);
                            console.log(err);
                            return res.status(500).send({
                                mensaje: "Ocurrio un error al eliminar la imagen anterior"
                            })
                        });
                } else {
                    modelProducto.findByIdAndUpdate(idProducto, update).then(producto => {
                        
                        logs.logActualizarProducto("Actualizar producto", usuario,idUsuario,"Admin","servicio actualizar producto", productoActualizado, productoActual);
                        
                        return res.send({
                            mensaje: "Producto actualizado exitosamente"
                        });
                    })
                }
            } else {
                logs.logErrores("Error:: No existe producto con id " + idProducto, usuario,idUsuario,"Admin","servicio actualizar Producto",productoActualizado);
                return res.status(404).send({
                    mensaje: "No existe producto con id " + idProducto
                })
            }
        }).catch(err => {
            logs.logErrores("Error:: " + err, usuario,idUsuario,"Sistema","servicio actualizar Producto");
            console.log(err);
            return res.status(500).send({
                mensaje: "Ocurrio un error en la actualizacion de producto"
            })
        })
    }
}