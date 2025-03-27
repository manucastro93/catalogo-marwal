const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const categoriaController = require('../controllers/categoria');

// Rutas de categorías
router.post('/create', auth('Administrador'), categoriaController.createCategoria);
router.put('/update/:id', auth('Administrador'), categoriaController.updateCategoria);
router.delete('/delete/:id', auth('Administrador'), categoriaController.deleteCategoria);
router.get('/all', auth(), categoriaController.getAllCategorias);

module.exports = router;