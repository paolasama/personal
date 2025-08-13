const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Importar rutas
const contactRoutes = require('./routes/contactRoutes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Manejar solicitudes preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Log de solicitudes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Bienvenido a la API del portafolio',
    endpoints: {
      contact: {
        sendMessage: 'POST /api/contacto',
        test: 'GET /api/contacto'
      }
    }
  });
});

// Ruta de prueba de la API
app.get('/api', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Configuración de rutas de la API
app.use('/api/contacto', contactRoutes);

// Manejador 404 (debe ir después de las rutas de la API)
app.use((req, res) => {
  console.warn(`Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada',
    requestedUrl: req.originalUrl,
    method: req.method,
    availableEndpoints: ['POST /api/contacto', 'GET /api']
  });
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error del servidor:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && {
      error: err.message,
      stack: err.stack
    })
  });
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=== Servidor en ejecución ===`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Hora: ${new Date().toISOString()}`);
  console.log('==========================\n');
});

// Manejo de errores del servidor
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Error: El puerto ${PORT} ya está en uso.`);
  } else {
    console.error('Error del servidor:', error);
  }
  process.exit(1);
});