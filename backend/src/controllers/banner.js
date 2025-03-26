const Banner = require('../models/banner');

const createBanner = async (req, res) => {
  const { titulo, imagen_url, enlace, posicion } = req.body;

  try {
    const bannerId = await Banner.create({ titulo, imagen_url, enlace, posicion });
    res.status(201).json({ id: bannerId });
  } catch (err) {
    console.error('Error creating banner:', err);
    res.status(500).json({ error: 'Error creating banner', details: err.message });
  }
};

const updateBanner = async (req, res) => {
  const { id } = req.params;
  const { titulo, imagen_url, enlace, posicion } = req.body;

  try {
    await Banner.update(id, { titulo, imagen_url, enlace, posicion });
    res.status(200).json({ message: 'Banner updated successfully' });
  } catch (err) {
    console.error('Error updating banner:', err);
    res.status(500).json({ error: 'Error updating banner', details: err.message });
  }
};

const deleteBanner = async (req, res) => {
  const { id } = req.params;

  try {
    await Banner.delete(id);
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (err) {
    console.error('Error deleting banner:', err);
    res.status(500).json({ error: 'Error deleting banner', details: err.message });
  }
};

const getBanners = async (req, res) => {
  try {
    const banners = await Banner.findAll();
    res.status(200).json(banners);
  } catch (err) {
    console.error('Error fetching banners:', err);
    res.status(500).json({ error: 'Error fetching banners', details: err.message });
  }
};

module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getBanners
};