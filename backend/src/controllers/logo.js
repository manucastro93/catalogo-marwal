const Logo = require('../models/logo');

const createOrUpdateLogo = async (req, res) => {
  const { imagen_url } = req.body;

  try {
    const logoId = await Logo.createOrUpdate({ imagen_url });
    res.status(201).json({ id: logoId });
  } catch (err) {
    console.error('Error creating or updating logo:', err);
    res.status(500).json({ error: 'Error creating or updating logo', details: err.message });
  }
};

const deleteLogo = async (req, res) => {
  const { id } = req.params;

  try {
    await Logo.delete(id);
    res.status(200).json({ message: 'Logo deleted successfully' });
  } catch (err) {
    console.error('Error deleting logo:', err);
    res.status(500).json({ error: 'Error deleting logo', details: err.message });
  }
};

const getLogo = async (req, res) => {
  try {
    const logo = await Logo.find();
    res.status(200).json(logo);
  } catch (err) {
    console.error('Error fetching logo:', err);
    res.status(500).json({ error: 'Error fetching logo', details: err.message });
  }
};

module.exports = {
  createOrUpdateLogo,
  deleteLogo,
  getLogo
};