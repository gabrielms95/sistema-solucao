// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Solution = require('./models/Solution');

const app = express();
const PORT = 3000;
const path = require('path');


app.use(cors());
app.use(express.json());
// Servir arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));


// Conexão com MongoDB local
mongoose.connect('mongodb://localhost:27017/solucao-chamados-montez', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado')).catch(err => console.error(err));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});



// Buscar solução por problema
app.get('/solutions/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ message: 'Query ausente' });

  const result = await Solution.find({
    problem: { $regex: query, $options: 'i' },
  });
  res.json(result);
});

// Adicionar nova solução
app.post('/solutions', async (req, res) => {
  const { problem, solution, keywords } = req.body;
  if (!problem || !solution) return res.status(400).json({ message: 'Campos obrigatórios' });

  const newSolution = new Solution({ problem, solution, keywords });
  await newSolution.save();
  res.status(201).json(newSolution);
});





app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
