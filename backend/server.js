const express = require('express');
const path = require('path');
const app = express();
const port = 5500; // Puerto configurado

// Configurar Express para servir archivos estáticos desde la carpeta frontend
app.use('/frontend', express.static(path.resolve(__dirname, '../frontend')));

// Redirigir la raíz (/) a /frontend/
app.get('/', (req, res) => {
  res.redirect('/frontend/');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Accede a http://127.0.0.1:${port}/frontend/ para ver el contenido.`);
});
