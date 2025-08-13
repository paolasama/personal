const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

/**
 * @route   POST /api/contacto
 * @desc    Envía un nuevo mensaje de contacto
 * @access  Public
 * @body    {string} nombre - Nombre del remitente
 * @body    {string} correo_electronico - Correo electrónico del remitente
 * @body    {string} mensaje - Contenido del mensaje
 * @body    {string} [asunto] - Asunto del mensaje (opcional)
 */
router.post('/', contactController.createContact);

// Ruta de prueba para verificar que la ruta está funcionando
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Ruta de contacto funcionando correctamente',
    availableMethods: ['POST']
  });
});

module.exports = router;