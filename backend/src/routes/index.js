const express = require('express');
const router = express.Router();

const clienteRoutes = require('./clientes');
const vendedorRoutes = require('./vendedores');
const bannerRoutes = require('./banners');
const logoRoutes = require('./logos');

router.use('/clientes', clienteRoutes);
router.use('/vendedores', vendedorRoutes); // Asegúrate de que esta línea esté presente
router.use('/banners', bannerRoutes);
router.use('/logos', logoRoutes);

module.exports = router;