const router = require('express').Router();
const mongoose = require('mongoose');
const Curso = require('../models/Curso');

router.get('/', async(req,res) => {
    const cursos = await Curso
        .find()
        .select('nome _id alunos');

    if (cursos.length <= 0) return res
        .status(404)
        .json({ message: 'Nenhum curso foi encontrado' });

    return res.status(200).json(cursos);
});

router.get('/:nome', async(req,res) => {
    const curso = await Curso
        .findOne({ nome: req.params.nome })
        .select('nome _id alunos');

    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });

    return res.status(200).json(curso);
});

router.post('/', async(req, res) => {
    try {
        const curso = await Curso.create({
            _id: mongoose.Types.ObjectId(),
            nome: req.body.nome
        });

        return res.status(201).json(curso);
    } catch (err) {
        if(err.code === 11000) return res.status(500).json({ message: 'Curso já existente' });
        return res.status(500).json({ message: 'Error' });
    }
});

router.put('/:_id', async(req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params._id))
        return res.status(500).json({ message: 'id inválido' });

    const curso = await Curso.findById(req.params._id);

    if (curso) {
        await Curso.updateOne({ _id: req.params._id }, { nome: req.body.nome });

        return res.status(201).json({ message: 'Curso atualizado' });
    } else {
        await Curso.create({
            _id: mongoose.Types.ObjectId(),
            nome: req.body.nome
        });
        return res.status(201).json({ message: 'Curso adicionado' });
    }
});

router.delete('/:_id', async(req, res) => {
    try {
        await Curso.deleteOne({ _id: req.params._id });
        return res.status(200).json({ message: 'Removido com sucesso' });
    } catch (err) {
        return res.status(500).json({ message: 'Erro interno' });
    }
});

module.exports = router;
