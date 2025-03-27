const Categoria = require('../models/categoria');
const logger = require('../config/logger');

const createCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const categoriaId = await Categoria.create({ nombre, descripcion });
    res.status(201).json({ id: categoriaId });
  } catch (err) {
    logger.error('Error creating categoria:', { error: err.message });
    res.status(500).json({ error: 'Error creating categoria', details: err.message });
  }
};

const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  try {
    await Categoria.update(id, { nombre, descripcion });
    res.status(200).json({ message: 'Categoria updated successfully' });
  } catch (err) {
    logger.error('Error updating categoria:', { error: err.message });
    res.status(500).json({ error: 'Error updating categoria', details: err.message });
  }
};

const deleteCategoria = async (req, res) => {
  const { id } = req.params;

  try {
    await Categoria.delete(id);
    res.status(200).json({ message: 'Categoria deleted successfully' });
  } catch (err) {
    logger.error('Error deleting categoria:', { error: err.message });
    res.status(500).json({ error: 'Error deleting categoria', details: err.message });
  }
};

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (err) {
    logger.error('Error fetching categorias:', { error: err.message });
    res.status(500).json({ error: 'Error fetching categorias', details: err.message });
  }
};

module.exports = {
  createCategoria,
  updateCategoria,
  deleteCategoria,
  getAllCategorias,
};