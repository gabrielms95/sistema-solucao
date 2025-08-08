const mongoose = require('mongoose');

const ProblemaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    solucoes: [String]
});

ProblemaSchema.index({
  titulo: 'text',
  descricao: 'text',
  solucoes: 'text'
});

module.exports = mongoose.model('Problema', ProblemaSchema);
