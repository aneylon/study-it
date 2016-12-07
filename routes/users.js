// routes for standard users
'use strict'
const authMiddleware = require('../middleware/auth')
const bodyParser = require('body-parser')
const NewUser = require('../models/newUser')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID

module.exports = function(express){
  let userRouter = express.Router()

  userRouter.get('/stuff', (req, res) => {
  	res.json({
  		success: true,
  		message: 'got it for sure'
  	})
  })

  userRouter.post('/signup', (req, res) => {
    // check if user exists
    NewUser.findOne({
      email: req.body.email
    }, (err, user) => {
      if(!user) {
        let newUser = new NewUser()

        newUser.name = req.body.name
        newUser.email = req.body.email
        newUser.password = req.body.password

        newUser.save((err, user) => {
          if(err) res.json({
            success: false,
            message: 'Error: ' + err
          })
          else res.json({
            success: true,
            message: 'Added new user'
          })
        })
      } else {
        res.json({
          success: false,
          message: 'User exists'
        })
      }
    })
    // if so send error message
    // else make new user and login
  })

  userRouter.post('/signin', (req, res) => {
    // find user
    NewUser.findOne({
      email: req.body.email
    },
    (err, user) => {
      if(!user) {
        res.json({
          success: false,
          message: 'User not found'
        })
      } else {
        if(user.comparePassword(req.body.password)) {
          //make token
          var token = jwt.sign({
            name: user.name,
            admin: user.admin
          },
          process.env.SECRET,
          {
            expiresIn: 1440
          })

          res.json({
            success: true,
            message: 'Logged In',
            token: token,
            admin: user.admin,
            name: user.name,
            id: user._id
          })
        } else {
          res.json({
            success: false,
            message: 'Password does not match.'
          })
        }
      }
    })
  })

  userRouter.use(authMiddleware)

  userRouter.post('/updateUser/:userId', (req, res) => {

    NewUser.findById(req.params.userId, function(err, user){
      if(!user){
        res.json({
          success: false,
          message: 'User not found'
        })
      } else {
        if (req.body.name) user.name = req.body.name
        if (req.body.email) user.email = req.body.email
        if (req.body.password) user.password = req.body.password
        user.save((err, user) => {
          if(err) {
            res.json({
              success: false,
              message: 'Error: ' + err
            })
          } else {
            res.json({
              success: true,
              message: 'User updated'
            })
          }
        })
      }

    })

    // res.send('updated user')
  })

  return userRouter
}
