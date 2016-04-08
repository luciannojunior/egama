//For really implementing the functionality in the future
var Student = require('../models/aluno');
var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
        var info = {
        err: [false], 
        output: {
        aniversariantes: [],
        alunos: 110,
        professores: 16,
        enem: 150,
        fimAula: "19:10"
    }
    };
    res.json(info);
});

module.exports = router;
