const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const createUsuario = async (req, res) => {
  const { nombre, username, email, password, rol } = req.body;

  if (!nombre || !username || !email || !password || !rol) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);

    const usuario = {
      nombre,
      username,
      email,
      password: hashedPassword,
      rol,
    };

    const usuarioId = await Usuario.create(usuario);
    res.status(201).json({ id: usuarioId });
  } catch (err) {
    logger.error('Error creating user:', { error: err.message });
    res.status(500).json({ error: 'Error creating user', details: err.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findByEmail(email);
    if (!usuario) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, usuario.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
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

const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(usuario);
  } catch (err) {
    logger.error('Error fetching user:', { error: err.message });
    res.status(500).json({ error: 'Error fetching user', details: err.message });
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (err) {
    logger.error('Error fetching usuarios:', { error: err.message });
    res.status(500).json({ error: 'Error fetching usuarios', details: err.message });
  }
};

const updateUsuario = async (req, res) => {
  const { nombre, email, rol } = req.body;

  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'User not found' });
    }

    usuario.nombre = nombre || usuario.nombre;
    usuario.email = email || usuario.email;
    usuario.rol = rol || usuario.rol;

    await Usuario.update(usuario);

    res.status(200).json(usuario);
  } catch (err) {
    logger.error('Error updating user:', { error: err.message });
    res.status(500).json({ error: 'Error updating user', details: err.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'User not found' });
    }

    await Usuario.delete(req.params.id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    logger.error('Error deleting user:', { error: err.message });
    res.status(500).json({ error: 'Error deleting user', details: err.message });
  }
};

module.exports = {
  createUsuario,
  loginUsuario,
  getUsuario,
  updateUsuario,
  deleteUsuario,
  getUsuarios
};