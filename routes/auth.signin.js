var express = require('express');

var router = express.Router();

var User = require('../models/user.js');

var jwt = require('jsonwebtoken');

var SECRET = global.secret;
var signInFn = function(req, res){

	User.getUserByUsername(req.body.login, function(err, user){

		if (err){

			res.json({err: [true, err]});

		} else if (user){

			return res.json({err:[true, "User is already registered"]}).end();

		}else{

			if (!req.body.login || !req.body.name || !req.body.password){
				res.json({"err": [true, "All field are required!"]});
				return;
			}

			var newUser = new User({
		    	_id: req.body.login,
		    	password: req.body.password,
		    	profile: {
		    		name: req.body.name,
		    		level: 1,
		    		isAdmin: true
		    	}
		    });


		    User.hashifyAndSave(newUser, function(err){
		    	if (err){
		    		res.json({err: [true, err]});
		    	}else{
		    		res.json({err: [false]});
		    	}
		    });

		}

	});

    
};


router.post('/', signInFn);

module.exports = router;