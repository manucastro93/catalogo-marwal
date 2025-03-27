const app = require('./app'); // Importa la configuración de la aplicación
const logger = require('./config/logger');

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});