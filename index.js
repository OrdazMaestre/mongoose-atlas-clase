// index.js
require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./config/config');
const routes = require('./routes');

const app = express();

app.use(express.json());  // ← permite leer JSON en las peticiones

// Todas las rutas empiezan con /api
app.use('/api', routes);

dbConnection()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Prueba crear usuario → POST http://localhost:${PORT}/api/users`);
    });
  })
  .catch(err => {
    console.error('Error grave al conectar a MongoDB');
    console.error(err);
    process.exit(1);
  });