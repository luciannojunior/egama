var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alunoSchema = new Schema({
    "_id": Number,
    "turma": String,
	"nome": String,
	"matricula": Number,
	"dataDeNascimento": Date,
	"telefone": [String],
	"email": String,
	"rg": {
		"numero": Number,
		"dataDeEmissao": Date,
		"orgao": String
	},
	"cpf": Number,
	"endereco": {
		"rua": String,
		"numero": String,
		"complemento": String,
		"bairro": String,
		"cidade": String,
		"estado": String
	},
	"responsavel": [{
		"grauDeParentesco": String,
		"nome": String,
		"telefone": [String],
		"email": String,
		"endereco": {
			"rua": String,
			"numero": String,
			"complemento": String,
			"bairro": String,
			"cidade": String,
			"estado": String
		}
	}],
	"notaEnemPassado": Number,
	"linguaEstrangeira": String,
	"cursos": [{
		"nome": String,
		"universidade": String
	}]

}
);

module.exports = mongoose.model('alunos', alunoSchema);