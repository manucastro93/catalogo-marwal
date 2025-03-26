const express = require('express');
const app = express();
const db = require('./config/db');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const clientesRoutes = require('./routes/clientes');
const pedidosRoutes = require('./routes/pedidos');
const vendedoresRoutes = require('./routes/vendedores');

app.use(express.json());
app.use('/api', routes);
app.use('/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/vendedores', vendedoresRoutes);

module.exports = app;