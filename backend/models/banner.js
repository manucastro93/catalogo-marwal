const pool = require('../config/db');
const Joi = require('joi');

const bannerSchema = Joi.object({
  titulo: Joi.string().min(3).max(50).required(),
  imagen: Joi.string().uri().required(),
});

const Banner = {
  create: async (banner) => {
    const { error } = bannerSchema.validate(banner);
    if (error) {
      throw new Error(error.details[0].message);
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO banners (titulo, imagen) VALUES (?, ?)',
        [banner.titulo, banner.imagen]
      );
      return result.insertId;
    } catch (err) {
      console.error('Error creating banner:', err);
      throw err;
    }
  },

  // Otras funciones del modelo...
};

module.exports = Banner;