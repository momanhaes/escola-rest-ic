const route = require("express").Router();
const escola = require("../database/database");

route.get("/", (req,res) => {
    const cursos = escola.cursos.map(curso => ({
        id: curso.id,
        nome: curso.nome
    }));

    if (cursos.length === 0) return res.status(404).json({ message: 'Nenhum curso encontrado' });

    return res.status(200).json(cursos);
});

route.get("/:id", (req,res) => {
    const id = req.params.id;
    const curso = escola.cursos.find(curso => curso.id === id);
    
    if (!curso) return res.status(404).json({ message: 'Não encontrado' });

    delete curso.alunos;
    return res.status(200).json(curso);
});

route.post("/", (req, res) => {
    const curso = {
        id: req.body.id,
        nome: req.body.nome
    };
    
    escola.cursos.push(curso);

    return res.status(201).json({ curso });
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
