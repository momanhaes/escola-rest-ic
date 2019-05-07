const router = require('express').Router();
const mongoose = require('mongoose');
const Aluno = require('../models/Aluno');

router.get('/', async(req, res) => {
    const alunos = await Aluno
        .find()
        .select('_id nome dataNascimento matriculaAtiva estadoCivil matricula telefone idade');

    if (alunos.length <= 0) return res.status(404).json({ message: 'Nenhum aluno encontrado' });

    return res.status(200).json(alunos);
});

router.get('/:_id', async(req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params._id))
        return res.status(400).json({ message: 'Id inválido' });

    const aluno = await Aluno
        .findOne({ _id: req.params._id })
        .select('_id nome dataNascimento matriculaAtiva estadoCivil matricula telefone idade')
        .populate('curso', '_id nome');

    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });

    return res.status(200).json(aluno);
});

router.post('/', async(req, res) => {
    const aluno = await Aluno.create({
        _id: mongoose.Types.ObjectId(),
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        matriculaAtiva: req.body.matriculaAtiva,
        estadoCivil: req.body.estadoCivil,
        matricula: req.body.matricula,
        telefone: req.body.telefone,
        idade: req.body.idade,
        curso: req.body.cursoId
    });

    return res.status(201).json(aluno);
});

router.delete('/:_id', async(req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params._id))
        return res.status(400).json({ message: 'Id inválido' });

    await Aluno.deleteOne({ _id: req.params._id });

    return res.status(200).json({ message: 'Aluno removido' });
});

module.exports = router;
