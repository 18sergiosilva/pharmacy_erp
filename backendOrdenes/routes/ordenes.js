var express = require('express');
var router = express.Router();
var logs = require('../utils/log');

const ordenes = require('../models/ordenes');
const productos = require('../models/productos');


router.post('/sinRegistro', async (req, res, next) => {
    try {
        var obj = {};
       
        //var id = req.params.id;
        var usuario = "noLogin";
        var idUsuario = "noLogin";
        //var orden = {};
        //console.log("idUsuarioi --> " + req.headers.idusuario);
        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;

        req.body.tipoPago = 0;
        req.body.estado = 0;
        ordenes.create(req.body).then((value) => {
            console.log("valores -->" + value);
            
            obj = value;
            //console.log("valores 222-->" + obj);
            logs.logOperacionOrden("Crear orden",obj._id , usuario,idUsuario,"Usuario","servicio ordenes", obj);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ codigoEstado: 200, mensaje: "La orden se creo con exito", codigoOrden: value._id });
        });
    }
    catch (err) {
        console.log(err)
        logs.logErrores("Error::Error inesperado al intentar crear orden msg:: "+ err, usuario,idUsuario,"Sistema","servicio ordenes");
        
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ codigoEstado: 404, mensaje: "Error Inesperado", objetoError: err });
        next(err);
    }
});

router.get('/sinRegistro/:id', async (req, res, next) => {
    const idOrden = req.params.id;

    var obj = {};
    

    ordenes.findById(idOrden).then(orden => {
       
        //var id = req.params.id;
        var usuario = "noLogin";
        var idUsuario = "noLogin";
        //var orden = {};
        //console.log("idUsuarioi --> " + req.headers.idusuario);
        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;

        if (orden) {
            // throw new Error('error de sistema al obtener orden!!.');
            Promise.all(orden.detalle.map(async detalle => {
                const producto = await productos.findOne({ sku: detalle.codigo });
                //console.log("Consultando producto -->" + producto);
                return {
                    _id: detalle._id,
                    codigo: detalle.codigo,
                    cantidad: detalle.cantidad,
                    producto
                }
            })).then(values => {
               obj = orden;
               //console.log("log---> " + obj);
                logs.logOperacionOrden("Consultar Orden",obj._id , usuario,idUsuario,"Usuario","servicio ordenes", obj);
                return res.send({
                    ...orden._doc,
                    detalle: values
                });
            }).catch(err => {
                console.log(err);

                logs.logErrores("Error:: Ocurrio un error al buscar la informacion de productos msg:: " + err, usuario,idUsuario,"Usuario","servicio ordenes");

                res.status(500).send({
                    codigoEstado: 500,
                    mensaje: "Ocurrio un error al buscar la informacion de productos",
                    objetoError: err
                });
                next(err);
            });

        } else {

            logs.logErrores("Error:: No existe orden con id " + idOrden, usuario,idUsuario,"Usuario","servicio ordenes");

            return res.status(404).send({
                codigoEstado: 404,
                mensaje: "No existe orden con id " + idOrden
            });
        }
    }).catch(err => {

        logs.logErrores("Error:: Ocurrio un error al consulta la orden msg:: " + err, usuario,idUsuario,"Sistema","servicio ordenes");

        console.log(err);
        res.status(500).send({
            codigoEstado: 500,
            mensaje: "Ocurrio un error al consulta la orden",
            objetoError: err
        });
        next(err);
    })
})

router.get('/', async (req, res, next) => {
    ordenes.find().then(data => {
        return res.send(data);
    }).catch(err => {
        return res.status(500).send({
            codigoEstado: 500,
            mensaje: "Ocurrio un error al consultar las ordenes",
            objetoError: err
        });
    })
})

router.put('/:id', async (req, res, next) => {
    const idOrden = req.params.id;
    const { estado } = req.body;


     //var id = req.params.id;
     var usuario = "noLogin";
     var idUsuario = "noLogin";
     //let ordenActualizada = {};
     //const obj = {};
     //console.log("idUsuarioi --> " + req.headers.idusuario);
     if (req.headers.usuario) usuario = req.headers.usuario;
     if (req.headers.idusuario) idUsuario = req.headers.idusuario;

     //const docs = await ordenes.findById(idOrden);
     //ordenActualizada = docs;

    if (estado >= 0 && estado <= 6) {
        ordenes.findByIdAndUpdate(idOrden, { estado }).then(orden => {
            if (orden) {

                //obj = orden;
                //console.log("actual->" + orden);
                
                //ordenActualizada = orden;
                //ordenActualizada.estado = estado;

                //console.log("actualizada->" + ordenActualizada);

                logs.logOperacionOrdenModificar("Modificar estado de Orden",orden._id, usuario,idUsuario,"Usuario","servicio ordenes",orden.estado ,estado);              
                return res.send({
                    codigoEstado: 200,
                    mensaje: "Estado de orden actualizado correctamente"
                });
            } else {
                logs.logErrores("Error:: No existe orden con id " + idOrden,usuario,idUsuario,"Usuario","servicio modificar ordenes");
                return res.status(404).send({
                    codigoEstado: 404,
                    mensaje: "No existe orden con id " + idOrden,
                    objetoError: err
                });
            }
        }).catch(err => {
            logs.logErrores("Error:: Ocurrio un error al buscar y actualizar la orden msg: " + err,usuario,idUsuario,"Sistema","servicio modificar ordenes");
            return res.status(500).send({
                codigoEstado: 500,
                mensaje: "Ocurrio un error al buscar y actualizar la orden",
                objetoError: err
            });
        })
    } else {
        logs.logErrores("Error:: El estado enviado es invalido msg: estado " + estado,usuario,idUsuario,"Sistema","servicio modificar ordenes");
        return res.status(400).send({
            codigoEstado: 400,
            mensaje: "El estado enviado es invalido"
        });
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        
        //var id = req.params.id;
        var usuario = "noLogin";
        var idUsuario = "noLogin";
        var orden = {};
        //console.log("idUsuarioi --> " + req.headers.idusuario);
        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;
        //console.log("idUsuarioi --> " + idUsuario);

        //log.obtenerOrden(id);
       // console.log("orden--> " + orden);

        ordenes.findByIdAndDelete(req.params.id).then((value) => {
            if (value) {
                //console.log("orden--> " + value);
                orden = value;

                logs.logOperacionOrden("Orden eliminada con exito!!",orden._id ,usuario,idUsuario,"Usuario","servicio eliminar orden", orden);
                
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ codigoEstado: 200, mensaje: "La orden se elimino con exito", codigoOrden: value._id });
            }
            else {

                logs.logErrores("Error:: Ocurrio un error al eliminar la orden msg:: La orden no existe",usuario,idUsuario,"Usuario","servicio eliminar ordenes");
     
                res.statusCode = 409;
                res.setHeader('Content-Type', 'application/json');
                res.json({ codigoEstado: 409, mensaje: "La orden no existe" });
            }
        }).catch((err) => {
            logs.logErrores("Error:: Ocurrio un error al eliminar la orden msg:: " + err,usuario,idUsuario,"Sistema","servicio eliminar ordenes");

            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.json({ codigoEstado: 404, mensaje: "Error Inesperado", objetoError: err });
            next(err);
        });
    }
    catch (err) {
        logs.logErrores("Error:: Ocurrio un error al eliminar la orden msg:: " + err,usuario,idUsuario,"Sistema","servicio eliminar ordenes");
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.json({ codigoEstado: 404, mensaje: "Error Inesperado", objetoError: err });
        next(err);
    }
});

module.exports = router;
