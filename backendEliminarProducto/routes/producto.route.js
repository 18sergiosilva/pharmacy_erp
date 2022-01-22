const productoController = require('../controllers/producto.controller');

module.exports = (app) => {
    app.delete('/producto/:id', productoController.eliminar);
}