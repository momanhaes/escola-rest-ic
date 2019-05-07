const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nome: String,
  dataNascimento: String,
  matriculaAtiva: String,
  estadoCivil: String,
  matricula: String,
  telefone: Array,
  idade: String,
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
