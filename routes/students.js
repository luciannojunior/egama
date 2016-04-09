var Student = require('../models/aluno');
var express = require('express');
var validator = require('../cgama-validator');
var _ = require('lodash');
var router = express.Router();

//Creates a new Student
router.post('/', function(req, res){
	
	var dataInput = {
		nome: req.body.nome,
		turma: req.body.turma,
		matricula: req.body.matricula,
		dataDeNascimento: req.body.dataDeNascimento,
		telefone: req.body.telefone,
		email: req.body.email,
		avatarUrl: req.body.avatarUrl,
		rg: req.body.rg,
		cpf: req.body.cpf,
		endereco: req.body.cpf,
		responsavel: req.body.responsavel,
		notaEnemPassado: req.body.notaEnemPassado,
		linguaEstrangeira: req.body.linguaEstrangeira,
		cursos: req.body.cursos
	};
	
	var newStudent = validator.student(dataInput);
	
	if (typeof newStudent === 'object'){

		var novoAluno = new Student(newStudent);

		novoAluno.save(function(err, data){
			if (err){
				console.log(err);
				res.json({err: [true, "Check console for debugging"]});
			}else{
		 		res.json({err: [false], output: data._id});
		 	}
		});

	}else{
		res.json({err: [true, newStudent]});
	}
	
	
});

router.get('/', function(req, res){
	Student.find({}, function(err, data){
		res.json(data);
	});
});

router.get('/:id', function(req, res){
	Student.findById(req.params.id, function(err, data){
		if (data){
			res.json({err: [false], output: data});
		}else{
			res.json({err: [true, "Aluno não encontrado"]});	
		}
		
	});
});
module.exports = router;
