var Student = require('../models/aluno');
var express = require('express');
var validator = require('../cgama-validator');
var router = express.Router();

//Creates a new Student
router.post('/', function(req, res){
	
	var dataInput = {
		nome: req.body.nome,
		turma: req.body.turma,
		matricula: 123
	};
	
	var newStudent = validator.student(dataInput);
	res.json(newStudent);
	// var newStudent = new Student({);

	// newStudent.save(function(err, data){
	// 	if (err) throw err;
	// 	res.json(data);
	// })
});

router.get('/', function(req, res){
	Student.find({}, function(err, data){
		res.json(data);
	});
});
module.exports = router;