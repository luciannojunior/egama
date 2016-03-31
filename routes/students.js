var Student = require('../models/aluno');
var express = require('express');

var router = express.Router();

//Creates a new Student
router.post('/', function(req, res){
	var newStudent = new Student({
		_id: req.body.id,
		turma: req.body.turma,
		nome: req.body.nome,
		matricula: req.body.matricula
	});

	newStudent.save(function(err, data){
		if (err) throw err;
		res.json(data);
	})
});

router.get('/', function(req, res){
	Student.find({}, function(err, data){
		res.json(data);
	});
});
module.exports = router;