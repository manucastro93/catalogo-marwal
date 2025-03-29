const pool = require('../config/db');
const Joi = require('joi');

const pedidoSchema = Joi.object({
  cliente_id: Joi.number().integer().required(),
  productos: Joi.array().items(Joi.object({
    producto_id: Joi.number().integer().required(),
    cantidad: Joi.number().integer().required(),
  })).required(),
});

const Pedido = {
  create: async (pedido) => {
    const { error } = pedidoSchema.validate(pedido);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const [result] = await connection.query(
        'INSERT INTO pedidos (cliente_id) VALUES (?)',
        [pedido.cliente_id]
      );
      const pedidoId = result.insertId;

      for (const producto of pedido.productos) {
        await connection.query(
          'INSERT INTO pedido_productos (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
          [pedidoId, producto.producto_id, producto.cantidad]
        );
      }

      await connection.commit();
      return pedidoId;
    } catch (err) {
      await connection.rollback();
      console.error('Error creating pedido:', err);
      throw err;
    } finally {
      connection.release();
    }
  },

  findAll: async () => {
      try {
        const [result] = await pool.query('SELECT * FROM pedidos');
        return result;
      } catch (err) {
        console.error('Error fetching pedidos:', err);
        throw err;
      }
    },
    
  findByVendedorId: async (vendedorId) => {
    try {
      const [rows] = await pool.query(`
        SELECT p.* FROM pedidos p
        JOIN clientes c ON p.cliente_id = c.id
        WHERE c.vendedor_id = ?`, [vendedorId]);
      return rows;
    } catch (err) {
      console.error('Error finding pedidos by vendedorId:', err);
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM pedidos WHERE pedido_id = ?', [id]);
      return rows;
    } catch (err) {
      console.error('Error finding pedidos by Id:', err);
      throw err;
    }
  },

  update: async (id, pedido) => {
    const { error } = pedidoSchema.validate(pedido);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query('DELETE FROM pedido_productos WHERE pedido_id = ?', [id]);

      for (const producto of pedido.productos) {
        await connection.query(
          'INSERT INTO pedido_productos (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)',
          [id, producto.producto_id, producto.cantidad]
        );
      }

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      console.error('Error updating pedido:', err);
      throw err;
    } finally {
      connection.release();
    }
  },

  delete: async (id) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      await connection.query('DELETE FROM pedido_productos WHERE pedido_id = ?', [id]);
      await connection.query('DELETE FROM pedidos WHERE id = ?', [id]);

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      console.error('Error deleting pedido:', err);
      throw err;
    } finally {
      connection.release();
    }
  },

  // Otras funciones del modelo...
};

module.exports = Pedido;