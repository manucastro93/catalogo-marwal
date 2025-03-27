const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pedidoController = require('../controllers/pedido');

// Crear un nuevo pedido
router.post('/', auth, pedidoController.createPedido);

// Obtener todos los pedidos
router.get('/', auth, pedidoController.getAllPedidos);

// Obtener un pedido por ID
router.get('/:id', auth, pedidoController.getPedidoById);

// Actualizar un pedido por ID
router.put('/:id', auth, pedidoController.updatePedido);

// Eliminar un pedido por ID
router.delete('/:id', auth, pedidoController.deletePedido);

module.exports = router;