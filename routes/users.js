// routes for standard users
const authMiddleware = require('../middleware/auth')
const bodyParser = require('body-parser')
const NewUser = require('../models/newUser')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongodb').ObjectID

module.exports = function(express){
  let userRouter = express.Router()

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
          if(err) res.send(err)
          else res.send('saved user' + user)
        })
      } else {
        res.send('user exists')
      }
    })
    // if so send error message
    // else make new user and login
  })

  userRouter.post('/signin', (req, res) => {
    console.log(req.body.email)
    // find user
    NewUser.findOne({
      email: req.body.email
    },
    (err, user) => {
      if(!user) {
        res.send('User not found')
      } else {
        if(user.comparePassword(req.body.password)) {
          //make token
          const token = jwt.sign({
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
            name: user.name
          })
        } else {
          res.send('password does not match')
        }
      }
    })
  })

  userRouter.use(authMiddleware)

  userRouter.post('/updateUser/:userId', (req, res) => {

    NewUser.findById(req.params.userId, function(err, user){
      if (req.body.name) user.name = req.body.name
      if (req.body.email) user.email = req.body.email
      if (req.body.password) user.password = req.body.password
      user.save((err, user) => {
        if(err) console.log(err)
        else console.log('saved user', user)
      })
    })
    
    res.send('updated user')
  })

  return userRouter
}
