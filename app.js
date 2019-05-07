const express = require("express");
const rotaALuno = require("./src/routes/alunos");
const rotaCurso = require("./src/routes/cursos");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use("/alunos", rotaALuno);
app.use("/cursos", rotaCurso);

app.get("/escola", (req, res) => res.status(200).json({ message: 'Bem vindo a escola' }));

module.exports = app;
