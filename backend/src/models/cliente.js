const db = require('../config/db');
const Joi = require('joi');

const clienteSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  apellido: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  telefono: Joi.string().min(10).max(15).required(),
  vendedor_id: Joi.number().integer().required(),
  password: Joi.string().min(8).required(),
});

const Cliente = {
  create: async (cliente) => {
    const { error } = clienteSchema.validate(cliente);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const result = await db.query(
        'INSERT INTO clientes (nombre, apellido, email, telefono, vendedor_id, password) VALUES (?, ?, ?, ?, ?, ?)',
        [cliente.nombre, cliente.apellido, cliente.email, cliente.telefono, cliente.vendedor_id, cliente.password]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating client:', err);
      throw err; // Puedes manejar este error en el controlador
    }
  },

  // Otras funciones del modelo...
};

module.exports = Cliente;