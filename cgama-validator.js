var _ = require('lodash');

var validator = {};

var regexp = {
	turma: /^[23][abcd]$/,
	notNumber: /\d/,
	date: /^([0-9]{2})\/([0-9]{2})\/(19|20{1})(\d{2})$/
};

var recursiveValidation = function (input){
	var returnMsg = false;

	var path = "";

	_.forEach(input, function(value, key){
		if (_.isString(value)){
			input[key] = _.trim(input[key]); 
			//if (!value.length){
			//	returnMsg = "O campo '"+path+"' não pode ser vazio";
			//}
		}
	});
	return input;
};

var dateParser = function(str){
	var dateList = str.split('/');
	var newDate = new Date(dateList[2], (dateList[1]-1), dateList[0]);
	return newDate;
};
validator.student = function(input){

	/** Trim spaces for all strings
	  * and validates empty strings
	 */
	input = recursiveValidation(input);

	if (!regexp.turma.test(input.turma)){
		return "Campo 'turma' inválido.";
	}else if (regexp.notNumber.test(input.nome)){
		return "O campo 'nome' possui números";
	}else if (input.nome.length > 100 || input.nome.split(' ').length < 2){
		return "O campo 'nome' está inválido";
	}else if (!_.isNumber(input.matricula)){
		return "O campo 'matricula' deve ser um numero";
	}else if (!regexp.date.test(input.dataDeNascimento)){
		return "O campo 'data de nascimento' está inválido";
	}


	//Parser a date string to a Date
	try {
		input.dataDeNascimento = dateParser(input.dataDeNascimento);
		input.rg.dataDeEmissao = dateParser(input.rg.dataDeEmissao);
	}catch(err){
		console.log('rg ou data de nascimento nao foram preenchidos');
	}

	return input;
};
module.exports = validator;
