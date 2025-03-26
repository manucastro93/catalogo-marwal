const Vendedor = require('../models/vendedor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createVendedor = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const vendedorId = await Vendedor.create({ nombre, email, password: hashedPassword });
    res.status(201).json({ id: vendedorId });
  } catch (err) {
    console.error('Error creating vendedor:', err);
    res.status(500).json({ error: 'Error creating vendedor', details: err.message });
  }
};

const updateVendedor = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    await Vendedor.update(id, { nombre, email, password: hashedPassword });
    res.status(200).json({ message: 'Vendedor updated successfully' });
  } catch (err) {
    console.error('Error updating vendedor:', err);
    res.status(500).json({ error: 'Error updating vendedor', details: err.message });
  }
};

const deleteVendedor = async (req, res) => {
  const { id } = req.params;

  try {
    await Vendedor.delete(id);
    res.status(200).json({ message: 'Vendedor deleted successfully' });
  } catch (err) {
    console.error('Error deleting vendedor:', err);
    res.status(500).json({ error: 'Error deleting vendedor', details: err.message });
  }
};

const getVendedores = async (req, res) => {
  try {
    const vendedores = await Vendedor.findAll();
    res.status(200).json(vendedores);
  } catch (err) {
    console.error('Error fetching vendedores:', err);
    res.status(500).json({ error: 'Error fetching vendedores', details: err.message });
  }
};

const generateVendedorLink = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'User ID is required to generate token.' });
    }

    const token = jwt.sign({ vendedorId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const link = `http://localhost:3000/api/clientes/register?token=${token}`;
    res.status(200).json({ link });
  } catch (err) {
    console.error('Error generating link:', err);
    res.status(500).json({ error: 'Error generating link', details: err.message });
  }
};

module.exports = {
  createVendedor,
  updateVendedor,
  deleteVendedor,
  getVendedores,
  generateVendedorLink
};