const express = require("express");
const rotaALuno = require("./src/routes/alunos");
const rotaCurso = require("./src/routes/cursos");
const app = express();
app.use("/alunos", rotaALuno);
app.use("/cursos", rotaCurso);

app.get("/escola", (req, res) => {

    return res.send("Escola alo mundo.")

});

module.exports = app;