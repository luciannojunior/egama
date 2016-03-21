var Aluno = require('../models/aluno');
var express = require('express');
var router = express.Router();
var functions = {
    // GET /alunos
    getAllAlunos: function(req, res){
        Aluno.find(
                    function (err, data) {
                        if (err) {
                            res.json({"err":[true, err]});
                        }else{
                            res.json({"err": [false], "data": data});
                        }
                                              
                    }
                );
    },
    // POST /alunos
    postOneAluno: function(req, res){
        console.log("post /alunos");
        var newStudent = new Aluno(req.body);
        console.log(newStudent);
                newStudent.save(function(err){
                    if (err){
                        // res.json({"err" : [true, err]});
                        res.send(err);
                    }else{
                        res.json({"err":[false]});
                    }
                });
    },
    // GET /alunos/:id
    getOneAluno: function(req, res){
        Aluno.findOne({_id: req.params.id}, function (err, data) {
                    if (err) {
                        res.json({"err" : [true, err]});
                    }else{
                        res.json({"err": [false], "data": data});   
                    }
                });
    },
    //PUT /alunos/:id
    updateOneAluno: function(req, res){
        var alunoId = req.params.id;
                Aluno.findOne({_id: alunoId}, function (err, aluno) {
                    if(err){
                        res.json({"err": [true, err]});
                    }else{
                        for (el in req.body){
                            aluno[el] = req.body[el];
                        }
                        aluno.save(function(err){
                            if(err){
                                res.json({"err":[true, err]});
                            }else{
                                res.json({"err":[false], "data": aluno});
                            }
                        });
                    } 
                });
    }
};

router.route('/alunos')
            .get(function(req, res){
                functions.getAllAlunos(req, res);
            })
            .post(function(req, res){
                functions.postOneAluno(req, res);           
            });

router.route('/alunos/:id')
            .get(function(req, res){
                functions.getOneAluno(req, res);
            })
            .put(function(req, res){
                functions.updateOneAluno(req, res);
            })
            .delete();

router.route('/alunos/turma/:turma').get(function(req, res){
    Aluno.find({turma: req.params.turma}, function(err, data){
        if (err){
            res.json({"err": [true, err]});
        }else{
            res.json({"err": [false], "data": data});
        }
    });   
});

router.route('/alunao').get(function(req, res){
    res.json(req.user.name);
});

module.exports = router;