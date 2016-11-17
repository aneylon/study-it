// routes for standard users
const authMiddleware = require('../middleware/auth')

module.exports = function(express){
  let userRouter = express.Router()


  userRouter.use(authMiddleware)

  userRouter.get('/allusers', (req, res) => {
    res.send('got all users')
  })

  return userRouter
}
