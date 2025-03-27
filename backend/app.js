const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const usuarioRoutes = require('./routes/usuario');
const vendedorRoutes = require('./routes/vendedor');
const productoRoutes = require('./routes/producto');
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación
const logger = require('./config/logger');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/vendedores', vendedorRoutes);
app.use('/api/productos', productoRoutes);
app.use('/auth', authRoutes); // Usa las rutas de autenticación

// Manejo de errores
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;