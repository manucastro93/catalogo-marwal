const db = require('../config/db');

const Logo = {
  createOrUpdate: async (logo) => {
    try {
      const existingLogos = await db.query('SELECT * FROM logos');
      if (existingLogos.length > 0) {
        await db.query('UPDATE logos SET imagen_url = ? WHERE id = ?', [logo.imagen_url, existingLogos[0].id]);
        return existingLogos[0].id;
      } else {
        const result = await db.query('INSERT INTO logos (imagen_url) VALUES (?)', [logo.imagen_url]);
        return result.insertId;
      }
    } catch (err) {
      console.error('Error creating or updating logo:', err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await db.query('DELETE FROM logos WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting logo:', err);
      throw err;
    }
  },

  find: async () => {
    try {
      const results = await db.query('SELECT * FROM logos');
      return results[0] || null;
    } catch (err) {
      console.error('Error fetching logo:', err);
      throw err;
    }
  }
};

module.exports = Logo;