const pool = require('../config/db');
const Joi = require('joi');

const bannerSchema = Joi.object({
  titulo: Joi.string().min(3).max(50).required(),
  imagen: Joi.string().uri().required(),
});

const logoSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  imagen: Joi.string().uri().required(),
});

const Pagina = {
  createBanner: async (banner) => {
    const { error } = bannerSchema.validate(banner);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO banners (titulo, imagen) VALUES (?, ?)',
        [banner.titulo, banner.imagen]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating banner:', err);
      throw err;
    }
  },

  updateBanner: async (id, banner) => {
    const { error } = bannerSchema.validate(banner);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      await pool.query(
        'UPDATE banners SET titulo = ?, imagen = ? WHERE id = ?',
        [banner.titulo, banner.imagen, id]
      );
    } catch (err) {
      console.error('Error updating banner:', err);
      throw err;
    }
  },

  deleteBanner: async (id) => {
    try {
      await pool.query('DELETE FROM banners WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting banner:', err);
      throw err;
    }
  },

  createLogo: async (logo) => {
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

  updateLogo: async (id, logo) => {
    const { error } = logoSchema.validate(logo);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      await pool.query(
        'UPDATE logos SET nombre = ?, imagen = ? WHERE id = ?',
        [logo.nombre, logo.imagen, id]
      );
    } catch (err) {
      console.error('Error updating logo:', err);
      throw err;
    }
  },

  deleteLogo: async (id) => {
    try {
      await pool.query('DELETE FROM logos WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting logo:', err);
      throw err;
    }
  },

  // Otras funciones del modelo...
};

module.exports = Pagina;