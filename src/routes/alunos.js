const route = require("express").Router();
const escola = require("../database/database");
const R = require('ramda');

route.get("/", (req, res) => {
    const alunos = escola.cursos.map(curso => {
        return curso.alunos;
    });

    return res.status(200).json(R.flatten(alunos));
});

route.get("/:id", (req,res) => {
    const id = req.params.id;

    const alunos = escola.cursos.map(curso => {
        return curso.alunos;
    });

    const alunosFlatten = R.flatten(alunos);

    const aluno = alunosFlatten.find(aluno => aluno.id === id);
    
    if (!aluno) return res.status(404).json({ message: 'Não encontrado' });

    return res.status(200).json(aluno);
});

route.post("/", (req, res) => {
    const cursoId = req.body.cursoId;

    const aluno = {
        id: req.body.id,
        nome: req.body.nome,
        dataNascimento: req.body.dataNascimento,
        matriculaAtiva: req.body.matriculaAtiva,
        estadoCivil: req.body.estadoCivil,
        matricula: req.body.matricula,
        telefone: req.body.telefone,
        idade: req.body.idade
    };
    
    const cursoIdx = escola.cursos.findIndex(curso => curso.id === cursoId);

    if (cursoIdx === undefined) return res.status(404).json({ message: 'Curso não encontrado' });

    escola.cursos[cursoIdx].push(aluno);
    return res.status(201).json({ aluno });
});





route.put('/:id', (req, res) => {
    const id = req.params.id;
    const nome = req.body.nome;

    const curso = escola.cursos.find(curso => curso.id === id);

    if (curso) {
        const cursos = escola.cursos.filter(curso => curso.id !== id);
        cursos.push({ id, nome });
        escola.cursos = cursos;

        return res.status(201).json({ message: 'Curso alterado' });
    }

    escola.cursos.push({ id, nome });
    return res.status(201).json({ message: 'Curso adicionado' });
});

route.delete("/:id", (req, res) => {
    const id = req.params.id;
    const cursos = escola.cursos.filter(curso => curso.id !== id);
    escola.cursos = cursos;
    console.log(escola.cursos);
    
    return res.status(200).json({message: "Removido com sucesso"});
});

module.exports = route;
