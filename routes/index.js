var express = require('express');
var router = express.Router();
var Card = require('../models/card');
var User = require('../models/user');

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

router.get('/api/getIt', function(req, res){
  // console.log('got it');
  res.send('got it');
});

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
  // check if user exists
    // if not, add
    // if send error / message
  user.save(function(err){
    if(err) throw err;
    console.log('added new user');
    res.json({success: true});
  })
  // res.send('signed up ' + JSON.stringify(req.body));
});

router.post('/api/signIn', function(req, res){
  console.log(req.body);
  res.send('signing in ' + JSON.stringify(req.body));
});

router.post('/api/postIt', function(req, res){
  console.log(req.body);
  // console.log('posted it');
// figure out best way to add card to specific lib
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

module.exports = router;
