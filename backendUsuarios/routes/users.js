var express = require('express');
var router = express.Router();
var crypto = require("crypto-js");

const usuarios = require('../models/usuarios');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', async (req, res, next) => {
  try {
    usuarios.find({ username: req.body.username }).then((value) => {
      if (value.length == 0) {
        usuarios.create(req.body).then((value) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({ codigoEstado: 200, mensaje: "El usuario se creo con exito" });
        });
      }
      else {
        res.statusCode = 409;
        res.setHeader('Content-Type', 'application/json');
        res.json({ codigoEstado: 409, mensaje: "El nombre de usuario ya existe" });
      }
    });
  }
  catch (err) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.json({ codigoEstado: 404, mensaje: "Error Inesperado", objetoError: err });
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, contraseña } = req.body;

  usuarios.findOne({ username })
    .then(user => {
      if (user) {
        var pass1=crypto.AES.decrypt(user.contraseña,'ayd1').toString(crypto.enc.Utf8);
        var pass2=crypto.AES.decrypt(contraseña,'ayd1').toString(crypto.enc.Utf8);
        if (pass1 === pass2) {
          return res.send(user);

        } else {
          return res.status(400).send({
            codigoEstado: 400,
            mensaje: "Contraseña incorrecta"
          });
        }
      } else {
        res.status(404).send({
          codigoEstado: 404,
          mensaje: "No existe usuario con username " + username
        });
      }

    }).catch(err => {
      console.log(err);
      res.status(500).send({
        codigoEstado: 500,
        mensaje: "Ocurrio un error en el servidor"
      });
    });

})



module.exports = router;
