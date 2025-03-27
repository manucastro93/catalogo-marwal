const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const usuario = await Usuario.findByUsername(username);
    if (!usuario) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!usuario.password) {
      return res.status(500).json({ error: 'Password is missing for this user' });
    }

    const isPasswordValid = bcrypt.compareSync(password, usuario.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: 'JWT secret is not defined' });
    }

    const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({ auth: true, token });
  } catch (err) {
    logger.error('Error logging in:', { error: err.message });
    res.status(500).json({ error: 'Error logging in', details: err.message });
  }
};

module.exports = {
  login,
};