const Logo = require('../models/logo');
const logger = require('../config/logger');

const createLogo = async (req, res) => {
  const { nombre, imagen } = req.body;

  try {
    const logoId = await Logo.create({ nombre, imagen });
    res.status(201).json({ id: logoId });
  } catch (err) {
    logger.error('Error creating logo:', { error: err.message });
    res.status(500).json({ error: 'Error creating logo', details: err.message });
  }
};

module.exports = {
  createLogo,
};