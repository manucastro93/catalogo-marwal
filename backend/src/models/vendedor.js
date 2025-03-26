const db = require('../config/db');

const Vendedor = {
  create: async (vendedor) => {
    try {
      const result = await db.query(
        'INSERT INTO vendedores (nombre, email, password) VALUES (?, ?, ?)',
        [vendedor.nombre, vendedor.email, vendedor.password]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating vendedor:', err);
      throw err;
    }
  },

  update: async (id, vendedor) => {
    try {
      await db.query(
        'UPDATE vendedores SET nombre = ?, email = ?, password = ? WHERE id = ?',
        [vendedor.nombre, vendedor.email, vendedor.password, id]
      );
    } catch (err) {
      console.error('Error updating vendedor:', err);
      throw err;
    }
  },

  delete: async (id) => {
    try {
      await db.query('DELETE FROM vendedores WHERE id = ?', [id]);
    } catch (err) {
      console.error('Error deleting vendedor:', err);
      throw err;
    }
  },

  findAll: async () => {
    try {
      const results = await db.query('SELECT * FROM vendedores');
      return results;
    } catch (err) {
      console.error('Error fetching vendedores:', err);
      throw err;
    }
  }
};

module.exports = Vendedor;