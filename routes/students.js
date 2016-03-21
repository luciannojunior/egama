var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
	res.json({"deu": "certo", "user": req.user.name});
});
module.exports = router;