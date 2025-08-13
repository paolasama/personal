const pool = require('../db/db');

exports.createContact = async (req, res) => {
  try {
    const { nombre, correo_electronico, mensaje, asunto } = req.body;
    
    // Validación básica
    if (!nombre || !correo_electronico || !mensaje) {
      return res.status(400).json({
        status: 'fail',
        message: 'Faltan campos requeridos',
        required: ['nombre', 'correo_electronico', 'mensaje']
      });
    }

    // Validar formato de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo_electronico)) {
      return res.status(400).json({
        status: 'fail',
        message: 'Por favor ingresa un correo electrónico válido'
      });
    }

    // Verificar conexión a la base de datos
    let client;
    try {
      client = await pool.connect();
      
      // Verificar si la tabla existe
      const tableExists = await client.query(
        "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'contactos')"
      );
      
      if (!tableExists.rows[0].exists) {
        // Si la tabla no existe, la creamos
        await client.query(`
          CREATE TABLE contactos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(100) NOT NULL,
            correo_electronico VARCHAR(100) NOT NULL,
            asunto VARCHAR(200),
            mensaje TEXT NOT NULL,
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
        `);
      }

      // Insertar el nuevo contacto
      const result = await client.query(
        'INSERT INTO contactos (nombre, correo_electronico, asunto, mensaje) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, correo_electronico, asunto || null, mensaje]
      );

      res.status(201).json({
        status: 'success',
        data: result.rows[0]
      });

    } catch (dbError) {
      console.error('Error en la consulta a la base de datos:', dbError);
      throw dbError; // Esto será manejado por el catch externo
    } finally {
      if (client) {
        client.release();
      }
    }

  } catch (error) {
    console.error('Error en createContact:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error interno del servidor',
      // En desarrollo, incluir más detalles del error
      ...(process.env.NODE_ENV === 'development' && {
        error: error.message,
        stack: error.stack
      })
    });
  }
};