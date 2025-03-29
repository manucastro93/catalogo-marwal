const pool = require('../config/db');
const Joi = require('joi');

const productoSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  descripcion: Joi.string().min(3).max(255).required(),
  precio: Joi.number().precision(2).required(),
  stock: Joi.number().integer().required(),
});

const Producto = {
  create: async (producto) => {
    const { error } = productoSchema.validate(producto);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)',
        [producto.nombre, producto.descripcion, producto.precio, producto.stock]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating producto:', err);
      throw err;
    }
  },

  update: async (id, producto) => {
    const { error } = productoSchema.validate(producto);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      await pool.query(
        'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?',
        [producto.nombre, producto.descripcion, producto.precio, producto.stock, id]
      );
    } catch (err) {
      console.error('Error updating producto:', err);
      throw err;
    }
  },

  findAll: async () => {
      try {
        const [result] = await pool.query('SELECT * FROM productos');
        return result;
      } catch (err) {
        console.error('Error fetching productos:', err);
        throw err;
      }
    },
    
  delete: async (id) => {
    try {
      await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting producto:', err);
      throw err;
    }
  },

  // Otras funciones del modelo...
};

module.exports = Producto;