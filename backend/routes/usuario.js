const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');
const auth = require('../middleware/auth');

// Rutas de usuarios
router.post('/create', auth('Administrador'), usuarioController.createUsuario);
// router.get('/generate-link', auth('Vendedor'), usuarioController.generateVendedorLink);

module.exports = router;