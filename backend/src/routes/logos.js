const express = require('express');
const router = express.Router();
const { createOrUpdateLogo, deleteLogo, getLogo } = require('../controllers/logo');
const auth = require('../middleware/auth');

router.post('/', auth('admin'), createOrUpdateLogo);
router.put('/:id', auth('admin'), createOrUpdateLogo);
router.delete('/:id', auth('admin'), deleteLogo);
router.get('/', getLogo);

module.exports = router;