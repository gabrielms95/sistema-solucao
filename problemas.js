const express = require('express');
const router = express.Router();
const Problema = require('../models/Problema');

// Criar novo problema
// USANDO UMA FUNCION ASSÍNCRONA PARA MANIPULAR AS PROMESSES
router.post('/', async (req, res) => {
  try {
    const problema = await Problema.create(req.body);
    res.status(201).json(problema);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os problemas
router.get('/', async (req, res) => {
  try {
    const problemas = await Problema.find().populate('solucoes');
    res.json(problemas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar problema por ID
router.get('/:id', async (req, res) => {
  try {
    const problema = await Problema.findById(req.params.id).populate('solucoes');
    if (!problema) return res.status(404).json({ error: 'Problema não encontrado' });
    res.json(problema);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
