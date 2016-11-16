var express = require('express')
var router = express.Router()
// var Card = require('../models/card')
var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var jwt = require('jsonwebtoken')
var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + process.env.DB_HOST

router.get('/libs/all', function(req, res){
  MongoClient.connect(url,function(err,db){
    var collection = db.collection('libList')
    collection.find({}).toArray(function(err, docs){
      res.json(docs)
    })
  })
})

router.get('/libs/:libName', function(req, res){
  var libName = req.params.libName

  MongoClient.connect(url,function(err, db){
    if(err)console.log(err)
    console.log('connected')

    var collection = db.collection(libName);
    collection.find({}).toArray(function(err,docs){
      res.json(docs)
    })
  })
})

router.post('/signUp', function(req, res){
  console.log(req.body)
  bcrypt.hash(req.body.password, null, null, function(err, hash){
    var user = new User({
      name: req.body.username,
      password: hash,
      email: req.body.email,
      admin: false
    })
    User.find({name: req.body.username}, function(err, searchResult){
      if(searchResult.length === 0){
        user.save(function(err){
          if(err) throw err
          res.json({success: true})
        })
      } else {
        res.send('Username already in use')
      }
    })
  })
})

router.post('/signIn', function(req, res){
  User.findOne({name: req.body.username}, function(err, searchResult){
    if(searchResult === null){//searchResult.length === 0 ||
      res.send('User not found')
    } else {
      var pwsMatch = bcrypt.compareSync(req.body.password, searchResult.password)
      if(pwsMatch){

        var token = jwt.sign({
          username: searchResult.name,
          admin: searchResult.admin
        }, process.env.SECRET, {
          expiresIn: 1440 // 24 hrs
        })

        res.json({
          success: true,
          message: 'Logged in.',
          token: token,
          admin: searchResult.admin,
          username: searchResult.name
        })

      } else {
        res.send('password does not match')
      }
    }
  })
})

// middleware to check JWT
router.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token']
  if(token){
    jwt.verify(token, process.env.SECRET, function(err, decoded){
      if(err){
        return res.json({ success: false, message:'Failed to authenticate token.'})
      } else {
        req.decoded = decoded
        next()
      }
    });
  } else {
    return res.status(403).send({ success: false, message:'No token provided'})
  }
})

router.get('/loggedIn', function(req, res){
  res.send(req.decoded)
})

router.post('/saveAnswer', function(req, res){
  console.log('saving', req.body)
  User.findOneAndUpdate(
    {'name':req.body.user},
    // {$set: {'admin':false}},
    {Answers:['test']},
    { upsert: true, new: true },
    (err, doc) => {
      if(err) console.log(err)
      console.log(doc)
    })
  // get user
  // save answer
  // use mongoose here + update login / signup to use Mongoose
  // use $inc to add one to answer
  res.send('saved')
})

router.post('/addCard', function(req, res){
  console.log('adding :', req.body)

  MongoClient.connect(url,function(err, db){
    if(err)console.log(err)
    console.log('connected')

    insertCard(db,function(){
      db.close() // not using, need to use?
      res.send('inserted')
    })
  })

  var insertCard = function(db, callback){
    var libList = db.collection('libList')
    libList.find({name: req.body.libName}).toArray(function(err,docs){
      console.log('found this lib in list', docs)
      if(docs.length === 0){
        console.log('nothing found')
        libList.insertOne({
          name: req.body.libName,
          subSections: [
            {name: req.body.sectName}
          ]
        })
      } else {
        if(docs[0].subSections.indexOf(req.body.sectName) === -1){
          console.log('adding ', req.body.sectName, 'to', req.body.libName)
          libList.updateOne(
            {name: req.body.libName},
            {$addToSet: {subSections:{name: req.body.sectName}}}
          )
        }
      }
    })

    var collection = db.collection(req.body.libName + '.' + req.body.sectName)
    collection.find({question: req.body.question}).toArray(function(err,docs){
      console.log('found:')
      console.dir(docs)
      if(docs.length === 0){
        collection.insertOne({
          question: req.body.question,
          answer: req.body.answer,
          explain: req.body.explain
        })
      }
      callback()
    })
  }
})

module.exports = router
