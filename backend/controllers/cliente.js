const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente');
const logger = require('../config/logger');

const registerCliente = async (req, res) => {
  const { token, nombre, apellido, email, telefono } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendedorId = decoded.vendedorId;

    if (!vendedorId) {
      return res.status(400).json({ error: 'vendedor_id is required' });
    }

    const cliente = {
      nombre,
      apellido,
      email,
      telefono,
      vendedor_id: vendedorId,
    };

    const clientId = await Cliente.create(cliente);
    res.status(201).json({ id: clientId });
  } catch (err) {
    logger.error('Error creating client:', { error: err.message });
    res.status(500).json({ error: 'Error creating client', details: err.message });
  }
};

const getClientsByVendedor = async (req, res) => {
  const vendedorId = req.user.id;

  try {
    const clientes = await Cliente.findByVendedorId(vendedorId);
    res.status(200).json(clientes);
  } catch (err) {
    logger.error('Error fetching clients by vendedor:', { error: err.message });
    res.status(500).json({ error: 'Error fetching clients by vendedor', details: err.message });
  }
};

module.exports = {
  registerCliente,
  getClientsByVendedor,
};