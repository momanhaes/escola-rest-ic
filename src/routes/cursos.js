const route = require("express").Router();

route.get("/", (req,res) => {

    return res.send("Testando curso");

});

module.exports = route;
