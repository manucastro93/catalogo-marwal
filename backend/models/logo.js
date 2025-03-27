const pool = require('../config/db');
const Joi = require('joi');

const logoSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  imagen: Joi.string().uri().required(),
});

const Logo = {
  create: async (logo) => {
    const { error } = logoSchema.validate(logo);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO logos (nombre, imagen) VALUES (?, ?)',
        [logo.nombre, logo.imagen]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating logo:', err);
      throw err;
    }
  },

  // Otras funciones del modelo...
};

module.exports = Logo;