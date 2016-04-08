var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

global.secret = 'biazinha';

var authLogin = require('./routes/auth.login.js');
var authSignin = require('./routes/auth.signin.js');

var studentsRouter = require('./routes/students.js');
var infoRouter = require('./routes/info.js');
/*
var groupsRouter = require('./routes/groups.js');
var parentsRouter = require('./routes/parents.js');
var snapshotRouter = require('./routes/snapshot.js');
var timetableRouter = require('./routes/timetable.js');*/

var authMiddle = require('./middleware/authBasic.js');

var app = express();
app.use(function(err, req, res, next){
	console.log(err.stack);
    res.json({err: [true, 'Check console for debugging']});
    return;
});

app.use(express.static('bsgama'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mongoose.connect('mongodb://localhost/cgama');

// Requires authentication to every request to /api
app.use('/api', authMiddle);

// Public route for login (require authentication)
app.use('/access', authLogin);

// Requires auth to create a new user
// TODO: Only allowed for admin users
app.use('/api/signin', authSignin);

// Private route to students
app.use('/api/students', studentsRouter);

app.use('/api/info', infoRouter);
/*
app.use('/api/groups', groupsRouter);

app.use('/api/parents', parentsRouter);

app.use('/api/timetable', timetableRouter);



app.use('/api/snapshot', snapshotRouter);*/

//Teste de criação de usuário
app.put('/put', function(req, res){
	res.json(req.headers);
});

app.get('/curl', function(req, res){
	res.json({deu: "certo"});
});

app.listen(3000, function(){console.log('Listening')});
