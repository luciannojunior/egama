var _ = require('lodash');

var validator = {};

var regexp = {
	turma: /^[23][abcd]$/,
	notNumber: /\d/
};

validator.student = function(input){
	_.forEach(input, function(vl, key){
		if (!_.isNumber(vl)){
			input[key] = _.trim(input[key]);
		}
	});
	if (!regexp.turma.test(input.turma)){
		return "Campo 'turma' inválido.";
	}else if (regexp.notNumber.test(input.nome)){
		return "O campo 'nome' possui números";
	}else if (input.nome.length > 100){
		return "O campo 'nome' está muito grande";
	}
	return input;
};
module.exports = validator;
