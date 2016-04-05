var express = require('express');

var router = express.Router();

var User = require('../models/user.js');

var jwt = require('jsonwebtoken');

var SECRET = global.secret;

var logInFn = function(req, res){
    console.log(req.body);
	User.getUserByUsername(req.body.login, function(err, user){
		if (err){
			console.log(err);
			res.json({err: [true, "An error occured at find a user"]});
		}
		if (!user){
			res.json({err: [true, "User and/or password are incorrect!"]})
		}else{
			User.checkPassword(req.body.password, user.password, function(err, isMatch){
				if (err) {
					console.log(err);
					res.json({err: [true, "An error occured at checking the password"]});
				}else if (!isMatch){
					res.json({err: [true, "User and/or password are incorrect/pass"]});
				}else{
					var payload = user.profile;
					jwt.sign(payload, SECRET, { algorithm: 'HS256' }, function(token) {
					  res.json({err: [false], output: token});
					});

				}
			});
		}
	});
}

router.post('/login', logInFn);

module.exports = router;