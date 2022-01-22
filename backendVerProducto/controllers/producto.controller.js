const modelProducto = require('../models/producto.model');
var logs = require('../utils/log');

module.exports = {
    getAll: (req, res) => {

        var usuario = "noLogin";
        var idUsuario = "noLogin";
        var obj = {};
        //var orden = {};
        //console.log("idUsuarioi --> " + req.headers.idusuario);
        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;

        const precioMinimo = Number(req.query.pmin);
        const precioMaximo = Number(req.query.pmax);
        const precioOrden = req.query.sp;

        const search = req.query.search;

        var query = {};
        var sort = {};

        var precioQuery = {};
        
        if (precioMinimo) precioQuery = { $gte: precioMinimo };
        if (precioMaximo) precioQuery = { ...precioQuery, $lte: precioMaximo }

        if(precioQuery?.$lte && precioQuery?.$gte) query.precio = precioQuery;
        if(search) query = {...query, $text: {$search: search}}

        if(precioOrden === "asc") sort.precio = 1;
        if(precioOrden === "des") sort.precio = -1;


        modelProducto.find(query).sort(sort)
        .then(productos => {
            obj = productos;
            logs.logOperacionOrden("Consultar producto", obj._id,usuario,idUsuario,"Usuario","servicio ver Producto", obj);
            return res.send(productos);
        });
    },

    getOne: (req, res) => {
        const idProducto = req.params.id;

        
        var usuario = "noLogin";
        var idUsuario = "noLogin";
        var obj = {};
        //var orden = {};
        //console.log("idUsuarioi --> " + req.headers.idusuario);
        if (req.headers.usuario) usuario = req.headers.usuario;
        if (req.headers.idusuario) idUsuario = req.headers.idusuario;

        
        modelProducto.findById(idProducto).then(producto => {
            if(producto){
                obj = producto;
                logs.logOperacionOrden("Consultar producto", obj._id,usuario,idUsuario,"Usuario","servicio ver Producto", obj);
                return res.send(producto);
            } else {
                logs.logErrores("Error::No existe producto con id " + idProducto, usuario,idUsuario,"Usuario","servicio ver Producto");
                return res.status(404).send({
                    mensaje: "No existe producto con id " + idProducto
                })
            }
        }).catch(err => {
            console.log(err);
            logs.logErrores("Error::Ocurrio un error al buscar el producto msg:: " + err, usuario,idUsuario,"Sistema","servicio ver Producto");
            return res.status(500).send({
                mensaje: "Ocurrio un error al buscar el producto."
            })
        })
    }
}