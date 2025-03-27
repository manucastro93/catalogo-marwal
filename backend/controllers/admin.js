const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const createAdmin = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const adminId = await Admin.create({ nombre, email, password: hashedPassword });

    res.status(201).json({ id: adminId });
  } catch (err) {
    logger.error('Error creating admin:', { error: err.message });
    res.status(500).json({ error: 'Error creating admin', details: err.message });
  }
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: admin.id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    logger.error('Error logging in admin:', { error: err.message });
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createAdmin,
  loginAdmin,
};