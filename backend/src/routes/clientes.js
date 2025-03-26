const express = require('express');
const router = express.Router();
const { registerCliente } = require('../controllers/cliente');
const auth = require('../middleware/auth');

// Ruta para registrar un cliente utilizando el enlace único del vendedor
router.post('/register', auth(), registerCliente);

module.exports = router;