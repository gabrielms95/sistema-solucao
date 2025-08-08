const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');
const Problema = require('./models/Problema');
const app = express();

// Conexão com MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/meuprojeto', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then( () => { console.log('MongoDB conectado!') })
  .catch(err => console.log(err));

// Config Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
