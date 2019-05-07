const mongoose = require('mongoose');
const Curso = require('../models/Curso');

async function isIdValid(_id) {
  return mongoose.Types.ObjectId.isValid(_id);
}

async function findAll() {
  return await Curso
    .find()
    .select('nome _id');
}

async function findByName(nome) {
  return await Curso
    .findOne({ nome })
    .select('nome _id');
}

async function findById(_id) {
  return await Curso.findById(_id);
}

async function create({ nome }) {
  return await Curso.create({
    _id: mongoose.Types.ObjectId(),
    nome
  });
};

async function deleteById(_id) {
  return await Curso.deleteOne({ _id });
}

async function updateOne({ _id, nome }) {
  return await Curso.updateOne({ _id }, { nome });
}

module.exports = {
  findAll,
  findByName,
  create,
  deleteById,
  isIdValid,
  findById,
  updateOne
};
