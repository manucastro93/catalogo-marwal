const Banner = require('../models/banner');
const logger = require('../config/logger');

const createBanner = async (req, res) => {
  const { titulo, imagen } = req.body;

  try {
    const bannerId = await Banner.create({ titulo, imagen });
    res.status(201).json({ id: bannerId });
  } catch (err) {
    logger.error('Error creating banner:', { error: err.message });
    res.status(500).json({ error: 'Error creating banner', details: err.message });
  }
};

module.exports = {
  createBanner,
};