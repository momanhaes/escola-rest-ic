const express = require("express"); 
const app = express();

app.get("/escola", (req, res) => {

    return res.send("Escola alo mundo.")

});

module.exports = app;