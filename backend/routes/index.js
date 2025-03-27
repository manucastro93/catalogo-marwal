const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const usuarioRoutes = require('./usuario');
const clienteRoutes = require('./cliente');
const paginaRoutes = require('./pagina');
const productoRoutes = require('./producto');
const pedidoRoutes = require('./pedido');
const categoriaRoutes = require('./categoria');

// Usar las rutas específicas para cada entidad
router.use('/auth', authRoutes);
router.use('/usuario', usuarioRoutes);
router.use('/cliente', clienteRoutes);
router.use('/pagina', paginaRoutes);
router.use('/producto', productoRoutes);
router.use('/pedido', pedidoRoutes);
router.use('/categoria', categoriaRoutes);

module.exports = router;