// routes for standard users
const authMiddleware = require('../middleware/auth')
const bodyParser = require('body-parser')
const NewUser = require('../models/newUser')
const jwt = require('jsonwebtoken')

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
    // find user
    User.findOne({
      email: req.body.email
    })
      .select('name email password admin')
      .exec((err, user) => {

    })
    // check password
    // if good return jwt
    // else return error message
  })

  userRouter.use(authMiddleware)

  userRouter.post('/updateUser/:userId', (req, res) => {

  })

  // test to verify middleware working
  userRouter.get('/allusers', (req, res) => {
    res.send('got all users')
  })

  return userRouter
}
