const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Rutas de autenticación
router.post('/login', authController.login);

module.exports = router;