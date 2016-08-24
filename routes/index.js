var express = require('express');
var router = express.Router();
// var Card = require('../models/card');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + process.env.DB_HOST;

router.get('/api/libs/:libName', function(req, res){
  var libName = req.params.libName;

  MongoClient.connect(url,function(err, db){
    if(err)console.log(err);
    console.log('connected');

    var collection = db.collection(libName);
    collection.find({}).toArray(function(err,docs){
      // res.send('loaded : '+ libName);
      res.json(docs);
    });
  });
});

router.post('/api/signUp', function(req, res){
  console.log(req.body);
  hashedPW = bcrypt.hashSync(req.body.password, null);
  var user = new User({
    name: req.body.username,
    password: hashedPW,
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
      enteredPW = bcrypt.hashSync(req.body.password, null);
      // console.log('entered pw :', req.body.password);
      console.log('entered pw :', enteredPW);
      console.log('stored pw :', searchResult.password);
      var pwsMatch = bcrypt.compareSync(req.body.password, searchResult.password);
      // var pwsMatch = bcrypt.compareSync(enteredPW, searchResult.password);
      // if(req.body.password === searchResult.password){
      if(pwsMatch){
        console.log('logged in');
        res.send('logged in');
      } else {
        console.log('no pw match');
        res.send('password does not match');
        // send jwt if successful
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

    insertCard(db,function(){
      db.close(); // not using, need to use?
      res.send('inserted');
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
      callback();
    });
  }
});

module.exports = router;
