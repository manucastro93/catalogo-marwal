const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente');
const bcrypt = require('bcryptjs');
const logger = require('../config/logger');

const registerCliente = async (req, res) => {
  const { token, nombre, apellido, email, telefono, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendedorId = decoded.vendedorId;

    if (!vendedorId) {
      return res.status(400).json({ error: 'vendedor_id is required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const cliente = {
      nombre,
      apellido,
      email,
      telefono,
      vendedor_id: vendedorId,
      password: hashedPassword,
    };

    const clientId = await Cliente.create(cliente);
    res.status(201).json({ id: clientId });
  } catch (err) {
    logger.error('Error creating client:', { error: err.message });
    res.status(500).json({ error: 'Error creating client', details: err.message });
  }
};

module.exports = {
  registerCliente,
};