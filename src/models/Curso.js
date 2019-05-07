const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: {
    type: String,
    unique: true
  },
  alunos: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' } ]
});

const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso;
