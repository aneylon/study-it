var express = require('express');
var router = express.Router();
// var Card = require('../models/card');
var User = require('../models/user');

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + process.env.DB_HOST;

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
  User.findOne({name: req.body.username}, function(err, searchResult){
    // handle null result.
    if(searchResult.length === 0){
      // user not found
      res.send('User not found');
    } else {
      console.log('entered pw :', req.body.password);
      console.log('stored pw :', searchResult.password);
      if(req.body.password === searchResult.password){
        console.log('logged in');
        res.send('logged in');
      } else {
        console.log('no pw match');
        res.send('password does not match');
      }
    }
  });
  // res.send('signing in ' + JSON.stringify(req.body));
});

router.post('/api/addCard', function(req, res){
  console.log('adding :', req.body);

  MongoClient.connect(url,function(err, db){
    if(err)console.log(err);
    console.log('connected');
    // check if exists
    // if not then insert

    insertCard(db,function(){
      db.close();
    });
  });

  var insertCard = function(db, callback){
    var collection = db.collection(req.body.libName);
    collection.find({question: req.body.question}).toArray(function(err,docs){
      console.log('found:');
      console.dir(docs);
      if(docs.length === 0){
        collection.insertOne({
          question: req.body.question,
          answer: req.body.answer,
          explain: req.body.explain
        });
      }
    });
  }
  // console.log('posted it');
// figure out best way to add card to specific lib
  // var cardSchema = new Schema({
  //   question: String,
  //   answer: String,
  //   explain: String
  // });
  // var Card = mongoose.model(req.body.libName, cardSchema);
  //
  // Card.findOne({question: req.body.question}, function(err, searchResult){
  //   if(err)console.log('error :', err);
  //   if(searchResult){
  //     // exists so send message
  //     console.log('result :', searchResult);
  //     res.send('already exists');
  //   } else {
  //     // add card
  //     var card = new Card({
  //       question: req.body.question,
  //       answer: req.body.answer,
  //       explain: req.body.explain
  //     });
  //
  //     card.save(function(err){
  //       if(err) throw err;
  //       console.log('saved new card');
  //       res.json({ success: true });
  //     });
  //   }
  // });
  // add notice of added or not
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
