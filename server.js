require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var routes = require('./routes');
var User = require('./models/user');
var Card = require('./models/card');

var scheduledTasks = require('./utils/schedule.js');

var port = process.env.PORT || 8888;
// mongoose.connect(process.env.DB_HOST);
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+process.env.DB_HOST);
app.set('superSecret', process.env.SECRET);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('public'));

app.get('/api/setup', function(req, res){
	var card = new Card({
		question: 'does this work?',
		answer: 'yes it does.',
		explain: 'cause you did it right.'
	});
	card.save(function(err){
		if(err) throw err;
		console.log('saved new card');
		res.json({ success: true });
	});
});

app.get('/api/gitIt', function(req, res){
	console.log('got it');
	res.send('got it');
});

app.post('/api/postIt', function(req, res){
	console.log(req.body);
	console.log('posted it');
	res.send('posted it' + JSON.stringify(req.body));
});

app.post('/api/loadLib', function(req, res){
	// make post request with name of lib to load {name : 'libName'}
	var libName = req.body.name;
	console.log('looking for', libName);
	// get ref to DB?
	// libName.find({}, function(err, results){
	// 	res.json(results);
	// })
	res.send('looking for ' + libName);
})

app.listen(port, function(){
	console.log('listening on : ',port);
});