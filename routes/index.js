const express = require('express')
const router = express.Router()
// const Card = require('../models/card')
const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + process.env.DB_HOST

router.get('/libs/all', (req, res)=>{
  MongoClient.connect(url,(err,db)=>{
    const collection = db.collection('libList')
    collection.find({}).toArray((err, docs)=>{
      res.json(docs)
    })
  })
})

router.get('/libs/:libName', (req, res)=>{
  const libName = req.params.libName

  MongoClient.connect(url,(err, db)=>{
    if(err)console.log(err)
    console.log('connected')

    const collection = db.collection(libName);
    collection.find({}).toArray((err,docs)=>{
      res.json(docs)
    })
  })
})

router.post('/signUp', (req, res)=>{
  console.log(req.body)
  bcrypt.hash(req.body.password, null, null, (err, hash)=>{
    const user = new User({
      name: req.body.username,
      password: hash,
      email: req.body.email,
      admin: false
    })
    User.find({name: req.body.username}, (err, searchResult)=>{
      if(searchResult.length === 0){
        user.save((err)=>{
          if(err) throw err
          res.json({success: true})
        })
      } else {
        res.send('Username already in use')
      }
    })
  })
})

router.post('/signIn', (req, res)=>{
  User.findOne({name: req.body.username}, (err, searchResult)=>{
    if(searchResult === null){//searchResult.length === 0 ||
      res.send('User not found')
    } else {
      const pwsMatch = bcrypt.compareSync(req.body.password, searchResult.password)
      if(pwsMatch){

        const token = jwt.sign({
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
router.use((req, res, next)=>{
  const token = req.body.token || req.query.token || req.headers['x-access-token']
  if(token){
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
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

router.get('/loggedIn', (req, res)=>{
  res.send(req.decoded)
})

router.post('/saveAnswer', (req, res)=>{
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

router.post('/addCard', (req, res)=>{
  console.log('adding :', req.body)

  MongoClient.connect(url,(err, db)=>{
    if(err)console.log(err)
    console.log('connected')

    insertCard(db,()=>{
      db.close() // not using, need to use?
      res.send('inserted')
    })
  })

  const insertCard = (db, callback)=>{
    const libList = db.collection('libList')
    libList.find({name: req.body.libName}).toArray((err,docs)=>{
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

    const collection = db.collection(req.body.libName + '.' + req.body.sectName)
    collection.find({question: req.body.question}).toArray((err,docs)=>{
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
