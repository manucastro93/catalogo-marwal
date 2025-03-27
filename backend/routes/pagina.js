const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const paginaController = require('../controllers/pagina');

// Rutas de página (banner y logo)
router.post('/banner/create', auth('Administrador'), paginaController.createBanner);
router.post('/logo/create', auth('Administrador'), paginaController.createLogo);

module.exports = router;