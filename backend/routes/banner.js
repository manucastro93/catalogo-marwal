const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bannerController = require('../controllers/banner');

// Rutas de banners
router.post('/create', auth('Administrador'), bannerController.createBanner);

module.exports = router;