const pool = require('../config/db');
const Joi = require('joi');

const vendedorSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  code: Joi.string().length(4).required(), // Agregamos el campo code
});

const generateRandomCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

const createUniqueCode = async () => {
  let code;
  let exists = true;
  while (exists) {
    code = generateRandomCode();
    const [result] = await pool.query('SELECT * FROM usuarios WHERE code = ? LIMIT 1', [code]);
    if (result.length === 0) {
      exists = false;
    }
  }
  return code;
};

const Vendedor = {
  create: async (vendedor) => {
    const code = await createUniqueCode();
    const vendedorWithCode = { ...vendedor, code };

    const { error } = vendedorSchema.validate(vendedorWithCode);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, email, password, code) VALUES (?, ?, ?, ?)',
        [vendedorWithCode.nombre, vendedorWithCode.email, vendedorWithCode.password, vendedorWithCode.code]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creando vendedor:', err);
      throw err;
    }
  },

  findByCode: async (code) => {
    try {
      const [result] = await pool.query('SELECT * FROM usuarios WHERE code = ? LIMIT 1', [code]);
      return result[0] || null;
    } catch (err) {
      console.error('Error encontrando vendedor por código:', err);
      throw err;
    }
  },

  // Otras funciones del modelo...
};

module.exports = Vendedor;