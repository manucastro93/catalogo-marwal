require('dotenv').config();
const mysql = require('mysql2/promise'); // Usamos mysql2 con Promesas

// Configuración de la conexión
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: false, // Necesario para Hostinger
  },
  connectTimeout: 10000, // 10 segundos para timeout de conexión
  waitForConnections: true,
  connectionLimit: 3, // Hostinger suele tener límites bajos (3-5)
  queueLimit: 0,
  enableKeepAlive: true, // Mantiene la conexión activa
  keepAliveInitialDelay: 30000, // Ping cada 30 segundos
};

// Creamos el pool de conexiones
let pool = mysql.createPool(dbConfig);

// Eventos del pool para manejar errores y conexiones
pool.on('connection', (connection) => {
  console.log(`🟢 Nueva conexión establecida (ID: ${connection.threadId})`);
});

pool.on('acquire', (connection) => {
  console.log(`🔵 Conexión adquirida (ID: ${connection.threadId})`);
});

pool.on('release', (connection) => {
  console.log(`🟡 Conexión liberada (ID: ${connection.threadId})`);
});

pool.on('error', (err) => {
  console.error('🔴 Error en el pool de MySQL:', {
    code: err.code,
    message: err.message,
  });

  // Reconectamos automáticamente en caso de ECONNRESET
  if (err.code === 'ECONNRESET' || err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('⚡ Intentando reconexión...');
    pool.end().then(() => {
      pool = mysql.createPool(dbConfig);
    });
  }
});

// Función para ejecutar consultas de manera segura
async function query(sql, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.query(sql, params);
    return results;
  } catch (err) {
    console.error('❌ Error en la consulta:', {
      sql: sql,
      params: params,
      error: err.message,
    });
    throw err; // Relanzamos el error para manejarlo en el controlador
  } finally {
    if (connection) connection.release(); // Liberamos la conexión SIEMPRE
  }
}

// Función para verificar la conexión al iniciar la app
async function testConnection() {
  try {
    const result = await query('SELECT 1 + 1 AS test');
    console.log('✅ Conexión a la base de datos verificada:', result);
  } catch (err) {
    console.error('❌ Fallo al conectar con la base de datos:', err.message);
    process.exit(1); // Detenemos la app si no hay conexión
  }
}

// Ping periódico para mantener la conexión activa (opcional)
setInterval(async () => {
  try {
    await query('SELECT 1');
  } catch (err) {
    console.error('⚠️ Ping fallido:', err.message);
  }
}, 30000); // Cada 30 segundos

// Exportamos las funciones
module.exports = {
  query,
  testConnection,
  getPool: () => pool, // Para acceder al pool si es necesario
};