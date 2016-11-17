require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
const routes = require('./routes');
const adminRoutes = require('./routes/admin')(express)
const userRoutes = require('./routes/users')(express)
const cardRoutes = require('./routes/cards')(express)
const answerRoutes = require('./routes/answers')(express)
// const User = require('./models/user');
// const Card = require('./models/card');

// const scheduledTasks = require('./utils/schedule.js');

const port = process.env.PORT || 8888;
if(process.env.DEV){
	// connect to dev db
} else {
	mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASS+process.env.DB_HOST,
	{ server: {
		reconnectTries: 30,
		autoReconnect: true
	}});
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('public'));

app.use('/admin', adminRoutes)
app.use('/user', userRoutes)
app.use('/card', cardRoutes)
app.use('/answer', answerRoutes)
app.use('/api', routes);

app.get('*', (req, res)=>{
	res.redirect('/')
})

app.listen(port, ()=>{
	console.log('listening on : ',port);
});
