require('dotenv').config();

var express = require('express');
var app = express();

var aNumber = 42;

var port = process.env.PORT || 8888;

app.use(express.static('public'));

app.listen(port, function(){
	console.log('listening on : ',port);
});