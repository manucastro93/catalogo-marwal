const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const vendedorController = require('../controllers/vendedor');

// Rutas de vendedores
router.post('/create', vendedorController.createVendedor);
router.get('/generate-link', auth('vendedor'), vendedorController.generateVendedorLink);

module.exports = router;