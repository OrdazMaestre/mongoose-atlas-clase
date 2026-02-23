// config/config.js
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conexión a MongoDB exitosa 🎉');
  } catch (error) {
    console.error('Error al conectar a MongoDB:');
    console.error(error.message);
    throw error;
  }
};

module.exports = { dbConnection };