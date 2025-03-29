const bcrypt = require('bcryptjs');
const Vendedor = require('../models/vendedor');
const logger = require('../config/logger');

const createVendedor = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);

    const vendedor = {
      nombre,
      email,
      password: hashedPassword
    };

    const vendedorId = await Vendedor.create(vendedor);
    res.status(201).json({ id: vendedorId });
  } catch (err) {
    logger.error('Error creando vendedor:', { error: err.message });
    res.status(500).json({ error: 'Error creando vendedor', details: err.message });
  }
};

const generateVendedorLink = async (req, res) => {
  try {
    const vendedorId = req.user.userId;
    const vendedor = await Vendedor.findByCode(vendedorId);

    if (!vendedor) {
      return res.status(404).json({ error: 'Vendedor no encontrado' });
    }

    const link = `${process.env.FRONTEND_URL}/register?code=${vendedor.code}`;
    res.json({ link });
  } catch (err) {
    logger.error('Error generando enlace de vendedor:', { error: err.message });
    res.status(500).json({ error: 'Error generando enlace de vendedor', details: err.message });
  }
};

const getVendedores = async (req, res) => {
  try {
    const vendedores = await Vendedor.findAll();
    res.status(200).json(vendedores);
  } catch (err) {
    logger.error('Error fetching sellers:', { error: err.message });
    res.status(500).json({ error: 'Error fetching sellers', details: err.message });
  }
};

module.exports = {
  createVendedor,
  generateVendedorLink,
  getVendedores
};