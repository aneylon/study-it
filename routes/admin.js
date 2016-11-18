// routes for admin users
const authMiddleware = require('../middleware/auth')

module.exports = function(express){
  let adminRouter = express.Router()

  adminRouter.use(authMiddleware)

  adminRouter.put('/makeAdmin/:userId', (req, res) => {
    // modify the admin field of a user
  })

  adminRouter.get('/allUsers', (req, res) => {
    res.send('got all users')
  })

  return adminRouter
}
