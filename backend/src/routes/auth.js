const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const db = require('../config/db');
const auth = require('../middleware/auth');// Importa el middleware auth

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { username, password, role = 'user', nombre, apellido, telefono, email } = req.body;

    // Validación básica
    if (!username || !password || !email) {
      return res.status(400).json({ 
        error: 'Username, password and email are required',
        code: 'MISSING_REQUIRED_FIELDS'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long',
        code: 'WEAK_PASSWORD'
      });
    }

    const userId = await User.create({ 
      username, 
      password, 
      role, 
      nombre, 
      apellido, 
      telefono, 
      email 
    });

    const token = jwt.sign(
      { 
        userId, 
        role, 
        username,
        email 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.status(201).json({ 
      userId,
      token,
      message: 'User registered successfully'
    });

  } catch (err) {
    console.error('Registration error:', err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        error: err.sqlMessage.includes('username') ? 
          'Username already exists' : 
          'Email already exists',
        code: 'DUPLICATE_ENTRY'
      });
    }

    res.status(500).json({
      error: 'Error during registration',
      code: 'REGISTRATION_ERROR',
      ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
  }
});

router.post('/login', async (req, res) => {
  let username, password; // Declaramos variables al inicio
  
  try {
    // 1. Obtener credenciales
    ({ username, password } = req.body);
    console.log('Intento de login para:', username);

    // 2. Validaciones básicas
    if (!username || !password) {
      return res.status(400).json({
        error: 'Username and password are required',
        code: 'MISSING_CREDENTIALS'
      });
    }

    // 3. Buscar usuario (con manejo mejorado de errores)
    let user;
    try {
      // Primero intentamos búsqueda exacta
      const exactMatch = await db.query(
        'SELECT * FROM users WHERE username = ? LIMIT 1', 
        [username]
      );
      
      user = exactMatch[0]?.[0] || exactMatch[0]; // Maneja diferentes formatos de respuesta
      
      // Si no encontramos, intentamos búsqueda case-insensitive con utf8mb4
      if (!user) {
        const caseInsensitiveMatch = await db.query(
          'SELECT * FROM users WHERE username COLLATE utf8mb4_general_ci = ? LIMIT 1',
          [username]
        );
        user = caseInsensitiveMatch[0]?.[0] || caseInsensitiveMatch[0];
      }
      
    } catch (dbError) {
      console.error('Error en consulta DB:', {
        error: dbError.message,
        query: dbError.sql,
        parameters: dbError.parameters
      });
      throw new Error('Database query error');
    }

    // 4. Validar usuario encontrado
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // 5. Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    // 6. Generar y devolver solo el token
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({ token });

  } catch (err) {
    console.error('Error en login:', {
      timestamp: new Date().toISOString(),
      username: username || 'undefined',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
    
    res.status(500).json({
      error: 'Authentication error',
      code: 'AUTH_ERROR'
    });
  }
});

// Ruta para obtener información del usuario actual
router.get('/me', auth(), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
        code: 'USER_NOT_FOUND'
      });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);

  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({
      error: 'Error fetching user data',
      code: 'FETCH_USER_ERROR'
    });
  }
});

module.exports = router;