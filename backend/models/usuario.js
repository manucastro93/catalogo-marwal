const pool = require('../config/db');
const Joi = require('joi');

const usuarioSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  username: Joi.string().min(3).max(50).required(), // Añadido el campo username
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  rol: Joi.string().valid('Administrador', 'Vendedor').required(),
});

const Usuario = {
  create: async (usuario) => {
    const { error } = usuarioSchema.validate(usuario);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, username, email, password, rol) VALUES (?, ?, ?, ?, ?)',
        [usuario.nombre, usuario.username, usuario.email, usuario.password, usuario.rol]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating usuario:', err);
      throw err;
    }
  },

  update: async (id, usuario) => {
    const { error } = usuarioSchema.validate(usuario);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      await pool.query(
        'UPDATE usuarios SET nombre = ?, username = ?, email = ?, password = ?, rol = ? WHERE id = ?',
        [usuario.nombre, usuario.username, usuario.email, usuario.password, usuario.rol, id]
      );
    } catch (err) {
      console.error('Error updating usuario:', err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting usuario:', err);
      throw err;
    }
  },

  findByEmail: async (email) => {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
      return rows[0];
    } catch (err) {
      console.error('Error finding usuario by email:', err);
      throw err;
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
      return rows[0];
    } catch (err) {
      console.error('Error finding usuario by id:', err);
      throw err;
    }
  },

  findByUsername: async (username) => {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
      return rows[0];
    } catch (err) {
      console.error('Error finding usuario by username:', err);
      throw err;
    }
  },
};

module.exports = Usuario;