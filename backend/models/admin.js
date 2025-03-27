const pool = require('../config/db');
const Joi = require('joi');

const adminSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const Admin = {
  create: async (admin) => {
    const { error } = adminSchema.validate(admin);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO admins (nombre, email, password) VALUES (?, ?, ?)',
        [admin.nombre, admin.email, admin.password]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating admin:', err);
      throw err;
    }
  },

  // Otras funciones del modelo...
};

module.exports = Admin;