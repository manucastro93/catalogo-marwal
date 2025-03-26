const bcrypt = require('bcryptjs');
const db = require('../config/db');

const User = {
  create: async (user) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const [result] = await db.query(
        'INSERT INTO users (username, password, role, nombre, apellido, telefono, email) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user.username, hashedPassword, user.role, user.nombre, user.apellido, user.telefono, user.email]
      );
      
      return result.insertId;
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  },

  findByUsername: async (username) => {
    try {
      // Versión corregida que maneja ambos tipos de respuesta
      const result = await db.query(
        'SELECT * FROM users WHERE username = ? LIMIT 1', 
        [username]
      );
      
      // Debug detallado
      console.log('Resultado completo de la consulta:', result);
      console.log('Tipo de resultado:', Array.isArray(result) ? 'Array' : 'Object');
      
      // Maneja tanto resultados MySQL2 como objetos directos
      const rows = Array.isArray(result) ? result : [result];
      
      if (rows[0]) {
        console.log('Usuario encontrado:', rows[0].username);
        return rows[0];
      }
      
      console.log('Usuario no encontrado en DB');
      return null;
    } catch (err) {
      console.error('Error en findByUsername:', {
        message: err.message,
        stack: err.stack,
        query: 'SELECT * FROM users WHERE username = ? LIMIT 1',
        parameters: [username]
      });
      throw err;
    }
  },

  // Métodos adicionales útiles
  comparePassword: async (candidatePassword, hashedPassword) => {
    try {
      return await bcrypt.compare(candidatePassword, hashedPassword);
    } catch (err) {
      console.error('Error comparing passwords:', err);
      throw err;
    }
  },

  updatePassword: async (userId, newPassword) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, userId]
      );
      
      return true;
    } catch (err) {
      console.error('Error updating password:', err);
      throw err;
    }
  },

};

module.exports = User;