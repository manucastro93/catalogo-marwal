const Pagina = require('../models/pagina');
const logger = require('../config/logger');

const createBanner = async (req, res) => {
  const { titulo, imagen } = req.body;

  try {
    const bannerId = await Pagina.createBanner({ titulo, imagen });
    res.status(201).json({ id: bannerId });
  } catch (err) {
    logger.error('Error creating banner:', { error: err.message });
    res.status(500).json({ error: 'Error creating banner', details: err.message });
  }
};

const updateBanner = async (req, res) => {
  const { id } = req.params;
  const { titulo, imagen } = req.body;

  try {
    await Pagina.updateBanner(id, { titulo, imagen });
    res.status(200).json({ message: 'Banner updated successfully' });
  } catch (err) {
    logger.error('Error updating banner:', { error: err.message });
    res.status(500).json({ error: 'Error updating banner', details: err.message });
  }
};

const deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    await Pagina.deleteBanner(id);
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (err) {
    logger.error('Error deleting banner:', { error: err.message });
    res.status(500).json({ error: 'Error deleting banner', details: err.message });
  }
};

const createLogo = async (req, res) => {
  const { nombre, imagen } = req.body;

  try {
    const logoId = await Pagina.createLogo({ nombre, imagen });
    res.status(201).json({ id: logoId });
  } catch (err) {
    logger.error('Error creating logo:', { error: err.message });
    res.status(500).json({ error: 'Error creating logo', details: err.message });
  }
};

const updateLogo = async (req, res) => {
  const { id } = req.params;
  const { nombre, imagen } = req.body;

  try {
    await Pagina.updateLogo(id, { nombre, imagen });
    res.status(200).json({ message: 'Logo updated successfully' });
  } catch (err) {
    logger.error('Error updating logo:', { error: err.message });
    res.status(500).json({ error: 'Error updating logo', details: err.message });
  }
};

const deleteLogo = async (req, res) => {
  const { id } = req.params;

  try {
    await Pagina.deleteLogo(id);
    res.status(200).json({ message: 'Logo deleted successfully' });
  } catch (err) {
    logger.error('Error deleting logo:', { error: err.message });
    res.status(500).json({ error: 'Error deleting logo', details: err.message });
  }
};

module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  createLogo,
  updateLogo,
  deleteLogo,
};