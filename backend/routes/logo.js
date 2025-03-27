const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const logoController = require('../controllers/logo');

// Rutas de logos
router.post('/create', auth('Administrador'), logoController.createLogo);

module.exports = router;