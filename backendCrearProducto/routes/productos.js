var express = require('express');
var router = express.Router();
var functions = require('./functions');
var logs = require('../utils/log');

const productos = require('../models/productos');
//const log = require('../models/log');

router.post('/', async (req, res, next) => {
    try {
        //throw new Error('something bad happened');
        var existe = await functions.existeProducto(req.body.sku);

        //var id = req.params.id;
        var usuario = "noLogin";
        var idUsuario = "noLogin";
        //var orden = {};
        //console.log("idUsuarioi --> " + req.headers.idusuario);
        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;

        var obj = {
            sku: req.body.sku,
            nombre:req.body.nombre,
            precio:req.body.precio,
            descripcion:req.body.descripcion,
            imagen: req.body.imagen,
            urlImagen: ""
        };

        if (existe == false) {
            var imageS3 = await functions.uploadS3File(req.body.imagen, req.body.sku);
            req.body.imagen = imageS3.Location;
            req.body.urlImagen = imageS3.Key;

            obj.urlImagen = imageS3.Key;
            productos.create(req.body).then();

            logs.logCrearProducto("Crear Producto", usuario,idUsuario,"Admin","servicio Crear Producto", obj);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ codigoEstado: 200, mensaje: "El producto se creo con exito" });
        }
        else {

           logs.logErrores("Error:: El producto ya existe", usuario,idUsuario,"Usuario","servicio Crear Producto", obj);

            res.statusCode = 409;
            res.setHeader('Content-Type', 'application/json');
            res.json({ codigoEstado: 409, mensaje: "El producto ya existe" });
        }
    }
    catch (err) {
        //console.log("Error Crear Producto  catch general->" + err)
        logs.logErrores("Error::Error inesperado al intentar crear un producto msg:: "+ err, usuario,idUsuario,"Sistema","servicio crear Producto", obj);
        
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ codigoEstado: 404, mensaje: "Error Inesperado", objetoError: err });
        next(err);
    }
});

module.exports = router;
