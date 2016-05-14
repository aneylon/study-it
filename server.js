require('dotenv').config();

var express = require('express');
var app = express();

var routes = require('./routes');

var port = process.env.PORT || 8888;

app.use(express.static('public'));

app.listen(port, function(){
	console.log('listening on : ',port);
});