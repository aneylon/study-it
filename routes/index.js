var express = require('express');
var router = express.Router();
// var Card = require('../models/card');
var User = require('../models/user');

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

router.get('/api/libs/:libName', function(req, res){
  var libName = req.params.libName;
  res.send('loaded : '+ libName);
});

router.post('/api/signUp', function(req, res){
  // check if user exists
  //   if exists send error
  //   else add user and send confirmation
  console.log(req.body);
  var user = new User({
    name: req.body.username,
    password: req.body.password,
    email: req.body.email,
    admin: false
  });

  // should a promise be used here?
  User.find({name: req.body.username}, function(err, searchResult){
    if(searchResult.length === 0){
      user.save(function(err){
        if(err) throw err;
        res.json({success: true});
      })
    } else {
      res.json({success: false});
    }
  });
});

router.post('/api/signIn', function(req, res){
  console.log(req.body);
  // check for existing user
    // if exists check password
      // if pw match, login
      // else error 'incorrect user/pw combo'
    // else error no such user
  res.send('signing in ' + JSON.stringify(req.body));
});

router.post('/api/postIt', function(req, res){
  console.log(req.body);
  // console.log('posted it');
// figure out best way to add card to specific lib
  var cardSchema = new Schema({
    question: String,
    answer: String,
    explain: String
  });
  var Card = mongoose.model(req.body.libName, cardSchema);
// old way
  var card = new Card({
    question: req.body.question,
    answer: req.body.answer,
    explain: req.body.explain
  });
// check if card exists
  // add if not
  // else, send error
  card.save(function(err){
    if(err) throw err;
    console.log('saved new card');
    res.json({ success: true });
  });

  // res.send('posted it' + JSON.stringify(req.body));
});

router.post('/api/loadLib', function(req, res){
  // make post request with name of lib to load {name : 'libName'}
  var libName = req.body.name;
  console.log('looking for', libName);
  // get ref to DB?
  // libName.find({}, function(err, results){
  //  res.json(results);
  // })
  res.send('looking for ' + libName);
});

router.get('/api/getIt', function(req, res){
  // console.log('got it');
  res.send('got it');
});

router.get('/api/setup', function(req, res){
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

module.exports = router;
