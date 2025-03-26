const db = require('../config/db');

const Pedido = {
  create: async (pedido) => {
    try {
      const [result] = await db.query(
        'INSERT INTO pedidos (cliente_id, vendedor_id, producto_id, cantidad, total) VALUES (?, ?, ?, ?, ?)',
        [pedido.cliente_id, pedido.vendedor_id, pedido.producto_id, pedido.cantidad, pedido.total]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating order:', err);
      throw err;
    }
  },

  findByVendedor: async (vendedor_id) => {
    try {
      const [results] = await db.query(
        'SELECT p.*, c.nombre as cliente_nombre, pr.nombre as producto_nombre ' +
        'FROM pedidos p ' +
        'JOIN clientes c ON p.cliente_id = c.id ' +
        'JOIN productos pr ON p.producto_id = pr.id ' +
        'WHERE p.vendedor_id = ?',
        [vendedor_id]
      );
      return results;
    } catch (err) {
      console.error('Error fetching orders:', err);
      throw err;
    }
  },

  findByIdAndVendedor: async (id, vendedor_id) => {
    try {
      const [results] = await db.query(
        'SELECT p.*, c.nombre as cliente_nombre, pr.nombre as producto_nombre ' +
        'FROM pedidos p ' +
        'JOIN clientes c ON p.cliente_id = c.id ' +
        'JOIN productos pr ON p.producto_id = pr.id ' +
        'WHERE p.id = ? AND p.vendedor_id = ?',
        [id, vendedor_id]
      );
      return results[0] || null;
    } catch (err) {
      console.error('Error fetching order:', err);
      throw err;
    }
  },

  // Método adicional útil para pedidos
  getWithDetails: async (pedido_id) => {
    try {
      const [results] = await db.query(
        'SELECT p.*, c.nombre as cliente_nombre, c.email as cliente_email, ' +
        'c.telefono as cliente_telefono, pr.nombre as producto_nombre, ' +
        'pr.precio as producto_precio, v.nombre as vendedor_nombre ' +
        'FROM pedidos p ' +
        'JOIN clientes c ON p.cliente_id = c.id ' +
        'JOIN productos pr ON p.producto_id = pr.id ' +
        'JOIN vendedores v ON p.vendedor_id = v.id ' +
        'WHERE p.id = ?',
        [pedido_id]
      );
      return results[0] || null;
    } catch (err) {
      console.error('Error fetching order details:', err);
      throw err;
    }
  }
};

module.exports = Pedido;