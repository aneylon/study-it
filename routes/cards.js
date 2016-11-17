// routes for interacting with Cards
const authMiddleware = require('../middleware/auth')

module.exports = function(express){
  let cardRouter = express.Router()


  cardRouter.use(authMiddleware)

  cardRouter.get('/allcards', (req, res) => {
    res.send('got all cards')
  })

  return cardRouter
}
