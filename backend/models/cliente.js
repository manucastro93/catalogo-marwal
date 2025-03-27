const pool = require('../config/db');
const Joi = require('joi');

const clienteSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  apellido: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().min(10).max(15).required(),
  vendedor_id: Joi.number().integer().required(),
});

const Cliente = {
  create: async (cliente) => {
    const { error } = clienteSchema.validate(cliente);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO clientes (nombre, apellido, email, telefono, vendedor_id) VALUES (?, ?, ?, ?, ?)',
        [cliente.nombre, cliente.apellido, cliente.email, cliente.telefono, cliente.vendedor_id]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating client:', err);
      throw err;
    }
  },

  findByVendedorId: async (vendedorId) => {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes WHERE vendedor_id = ?', [vendedorId]);
      return rows;
    } catch (err) {
      console.error('Error finding clients by vendedorId:', err);
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
      console.error('Error finding client by id:', err);
      throw err;
    }
  },

  // Otras funciones del modelo...
};

module.exports = Cliente;