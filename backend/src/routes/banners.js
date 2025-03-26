const express = require('express');
const router = express.Router();
const { createBanner, updateBanner, deleteBanner, getBanners } = require('../controllers/banner');
const auth = require('../middleware/auth');

router.post('/', auth('admin'), createBanner);
router.put('/:id', auth('admin'), updateBanner);
router.delete('/:id', auth('admin'), deleteBanner);
router.get('/', getBanners);

module.exports = router;