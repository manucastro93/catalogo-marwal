const db = require('../config/db');

const Banner = {
  create: async (banner) => {
    try {
      const result = await db.query(
        'INSERT INTO banners (titulo, imagen_url, enlace, posicion) VALUES (?, ?, ?, ?)',
        [banner.titulo, banner.imagen_url, banner.enlace, banner.posicion]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating banner:', err);
      throw err;
    }
  },

  update: async (id, banner) => {
    try {
      await db.query(
        'UPDATE banners SET titulo = ?, imagen_url = ?, enlace = ?, posicion = ? WHERE id = ?',
        [banner.titulo, banner.imagen_url, banner.enlace, banner.posicion, id]
      );
    } catch (err) {
      console.error('Error updating banner:', err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await db.query('DELETE FROM banners WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting banner:', err);
      throw err;
    }
  },

  findAll: async () => {
    try {
      const results = await db.query('SELECT * FROM banners ORDER BY posicion ASC');
      return results;
    } catch (err) {
      console.error('Error fetching banners:', err);
      throw err;
    }
  }
};

module.exports = Banner;