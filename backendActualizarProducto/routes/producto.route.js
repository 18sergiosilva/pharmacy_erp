const productoController = require('../controllers/producto.controller');

module.exports = (app) => {
    app.put('/producto/:id', productoController.actualizar);
}