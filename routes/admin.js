// routes for admin users
const authMiddleware = require('../middleware/auth')
const NewUser = require('../models/newUser')

module.exports = function(express){
  let adminRouter = express.Router()

  adminRouter.use(authMiddleware)

  adminRouter.put('/makeAdmin/:userId', (req, res) => {
    // modify the admin field of a user
    //
    res.send('made' + req.params.userId + 'admin')
  })

  adminRouter.get('/allUsers', (req, res) => {
    NewUser.find({}, (err, docs) => {
      if(err) console.log(err)
      else res.send(docs)
    })
    // res.send('got all users')
  })

  return adminRouter
}
