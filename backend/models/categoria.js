const pool = require('../config/db');
const Joi = require('joi');

const categoriaSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  descripcion: Joi.string().max(255).optional(),
});

const Categoria = {
  create: async (categoria) => {
    const { error } = categoriaSchema.validate(categoria);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
        [categoria.nombre, categoria.descripcion]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating categoria:', err);
      throw err;
    }
  },

  update: async (id, categoria) => {
    const { error } = categoriaSchema.validate(categoria);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      await pool.query(
        'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
        [categoria.nombre, categoria.descripcion, id]
      );
    } catch (err) {
      console.error('Error updating categoria:', err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await pool.query('DELETE FROM categorias WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting categoria:', err);
      throw err;
    }
  },

  findAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM categorias');
      return rows;
    } catch (err) {
      console.error('Error finding all categorias:', err);
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM categorias WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
      console.error('Error finding categoria by id:', err);
      throw err;
    }
  },

  // Otras funciones del modelo...
};

module.exports = Categoria;