const express = require('express');
const router = express.Router();
const Pedido = require('../models/pedido');
const auth = require('../middleware/auth');

// Ruta para obtener todos los pedidos (administradores) o los pedidos del vendedor autenticado
router.get('/', auth(['admin', 'vendedor']), async (req, res) => {
  try {
    const pedidos = req.user.role === 'admin' 
      ? await Pedido.findByVendedor(null)
      : await Pedido.findByVendedor(req.user.userId);
    
    res.json(pedidos);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ 
      error: 'Error fetching orders',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Ruta para obtener un pedido por ID (administradores o el vendedor del pedido)
router.get('/:id', auth(['admin', 'vendedor']), async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = req.user.role === 'admin'
      ? await Pedido.findByIdAndVendedor(id, null)
      : await Pedido.findByIdAndVendedor(id, req.user.userId);

    if (!pedido) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(pedido);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ 
      error: 'Error fetching order',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Ruta para crear un nuevo pedido (solo para vendedores)
router.post('/', auth(['vendedor']), async (req, res) => {
  try {
    const { cliente_id, producto_id, cantidad, total } = req.body;
    const vendedor_id = req.user.userId;

    // Validación básica
    if (!cliente_id || !producto_id || !cantidad || !total) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const orderId = await Pedido.create({ 
      cliente_id, 
      vendedor_id, 
      producto_id, 
      cantidad, 
      total 
    });

    res.status(201).json({ 
      id: orderId,
      message: 'Order created successfully'
    });
  } catch (err) {
    console.error('Error creating order:', err);
    
    // Manejo especial para errores de clave foránea
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({ error: 'Invalid client or product reference' });
    }
    
    res.status(500).json({ 
      error: 'Error creating order',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Ruta para actualizar un pedido (solo el vendedor asociado)
router.put('/:id', auth(['vendedor']), async (req, res) => {
  try {
    const { id } = req.params;
    const { cantidad, total, estado } = req.body;
    const vendedor_id = req.user.userId;

    // Verificar que el pedido pertenezca al vendedor
    const existingOrder = await Pedido.findByIdAndVendedor(id, vendedor_id);
    if (!existingOrder) {
      return res.status(403).json({ error: 'Not authorized to update this order' });
    }

    await Pedido.update(id, { cantidad, total, estado });
    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ 
      error: 'Error updating order',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Ruta para actualizar el estado de un pedido
router.patch('/:id/status', auth(['vendedor', 'admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;
    const vendedor_id = req.user.role === 'admin' ? null : req.user.userId;

    const result = await Pedido.updateStatus(id, estado, vendedor_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found or not authorized' });
    }

    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ 
      error: 'Error updating order status',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// Ruta para eliminar un pedido (solo admin o el vendedor asociado)
router.delete('/:id', auth(['admin', 'vendedor']), async (req, res) => {
  try {
    const { id } = req.params;
    const vendedor_id = req.user.role === 'admin' ? null : req.user.userId;

    const result = await Pedido.delete(id, vendedor_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found or not authorized' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ 
      error: 'Error deleting order',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

module.exports = router;