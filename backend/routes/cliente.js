const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente');
const auth = require('../middleware/auth');

// Rutas de clientes
router.post('/register', clienteController.registerCliente);
router.get('/vendedor', auth('Vendedor'), clienteController.getClientsByVendedor);

module.exports = router;