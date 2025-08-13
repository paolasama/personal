const pool = require('../db');

class Contacto {
  static async crear(nombre, correo, asunto, mensaje) {
    const query = `
      INSERT INTO contactos (nombre, correo_electronico, asunto, mensaje)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [nombre, correo, asunto, mensaje];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async obtenerTodos() {
    const { rows } = await pool.query('SELECT * FROM contactos ORDER BY fecha_creacion DESC');
    return rows;
  }
}

module.exports = Contacto;