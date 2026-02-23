const express = require('express');
const router = express.Router();
const Task = require('../models/Task'); //sale en rojo, pero es como funciona

// 1. Crear tarea
router.post('/create', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: 'Error al crear la tarea',
      error: error.message
    });
  }
});

// 2. Listar todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
});

// 3. Obtener una tarea por id
router.get('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar la tarea' });
  }
});

// 4. Marcar como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar' });
  }
});

// 5. Actualizar título (solo título)
router.put('/id/:_id', async (req, res) => {
  try {
    // Solo permitimos cambiar el título
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Debes enviar el nuevo título' });
    }

    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { title },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({
      message: 'Error al actualizar el título',
      error: error.message
    });
  }
});

// 6. Eliminar tarea
router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
});

module.exports = router;