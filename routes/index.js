// routes/index.js
const express = require('express');
const router = express.Router();

const tasksRouter = require('./tasks');   // ← sin .js

router.use('/tasks', tasksRouter);

module.exports = router;