require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./config/config');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de Tareas - CRUD con Mongoose' });
});

app.use('/api', routes);

dbConnection()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor de tareas en http://localhost:${PORT}`);
      console.log(`Rutas: http://localhost:${PORT}/api/tasks/...`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a MongoDB');
    process.exit(1);
  });