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

// var scheduledTasks = require('./utils/schedule.js');

var port = process.env.PORT || 8888;
// mongoose.connect(process.env.DB_HOST);
// TODO: need to deal with lack of connection
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+process.env.DB_HOST);
app.set('superSecret', process.env.SECRET);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/api', routes);
app.get('*', (req, res)=>{
	res.redirect('/')
})

app.listen(port, function(){
	console.log('listening on : ',port);
});
