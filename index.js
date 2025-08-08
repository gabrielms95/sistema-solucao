const express = require('express');
const router = express.Router();
const Problema = require('../models/Problema');

// Página inicial
router.get('/', (req, res) => {
  res.render('index');
});

// Rota para buscar problemas
router.post('/buscar', async (req, res) => {
  try {
    const { termo } = req.body;

    if (!termo) {
      return res.status(400).json({ error: 'Digite um problema para buscar.' });
    }

    // Busca textual + ordena pela relevância
    const problemas = await Problema.find(
      { $text: { $search: termo } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } });

    res.json(problemas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar problemas' });
  }
});

// Rota para cadastrar um novo problema
router.post('/cadastrar', async (req, res) => {
  console.log('Dados recebidos:', req.body);
  try {
    const { titulo, descricao, solucoes } = req.body;

    if (!titulo || !descricao || !solucoes) {
      return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    const novoProblema = new Problema({ titulo, descricao, solucoes });
    await novoProblema.save();

    res.status(201).json(novoProblema);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cadastrar problema' });
  }
});



router.get('/buscar', async (req, res) => {
  try {
    const solucoes = req.body.solucoes;

    

    if (!solucoes) {
      console.log('solucoes');
      return res.status(400).json({ error: 'Sem solução cadastrada.' });
      
    }

    // Busca textual + ordena pela relevância
    const problemas = await Problema.find(
      { $text: { $search: solucoes } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } });

    res.json(problemas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar problemas' });
  }
});



module.exports = router;
