const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createVendedor, updateVendedor, deleteVendedor, getVendedores, generateVendedorLink } = require('../controllers/vendedor');


router.post('/', auth('admin'), createVendedor);
router.put('/:id', auth('admin'), updateVendedor);
router.delete('/:id', auth('admin'), deleteVendedor);
router.get('/', auth('admin'), getVendedores);
router.get('/generate-link', auth('vendedor'), generateVendedorLink); // Cambiar a 'vendedor'

module.exports = router;