const Producto = require('../models/producto');
const logger = require('../config/logger');

const createProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;

  try {
    const productoId = await Producto.create({ nombre, descripcion, precio, stock });
    res.status(201).json({ id: productoId });
  } catch (err) {
    logger.error('Error creating producto:', { error: err.message });
    res.status(500).json({ error: 'Error creating producto', details: err.message });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock } = req.body;

  try {
    await Producto.update(id, { nombre, descripcion, precio, stock });
    res.status(200).json({ message: 'Producto updated successfully' });
  } catch (err) {
    logger.error('Error updating producto:', { error: err.message });
    res.status(500).json({ error: 'Error updating producto', details: err.message });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await Producto.delete(id);
    res.status(200).json({ message: 'Producto deleted successfully' });
  } catch (err) {
    logger.error('Error deleting producto:', { error: err.message });
    res.status(500).json({ error: 'Error deleting producto', details: err.message });
  }
};

module.exports = {
  createProducto,
  updateProducto,
  deleteProducto,
};