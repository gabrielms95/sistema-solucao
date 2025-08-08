const express = require('express');
const router = express.Router();
const Solucao = require('../models/Solucao');
const Problema = require('../models/Problema');

// Criar nova solução
router.post('/', async (req, res) => {
  try {
    const solucao = await Solucao.create(req.body);

    // Vincular ao problema
    await Problema.findByIdAndUpdate(solucao.problema_id, {
      $push: { solucoes: solucao._id },
      status: 'resolvido'
    });

    res.status(201).json(solucao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todas as soluções
router.get('/', async (req, res) => {
  try {
    const solucoes = await Solucao.find().populate('problema_id');
    res.json(solucoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
