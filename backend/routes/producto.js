const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto');
const auth = require('../middleware/auth');

// Rutas de productos
router.post('/create', auth('Administrador'), productoController.createProducto);
router.get('/all', productoController.getProductos);
// Otras rutas relacionadas con productos

module.exports = router;