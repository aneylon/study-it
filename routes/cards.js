// routes for interacting with Cards
const authMiddleware = require('../middleware/auth')

module.exports = function(express){
  let cardRouter = express.Router()

  cardRouter.get('/allcards/:deckName', (req, res) => {
    // get all cards with a specific deck name
    res.send('got all cards')
  })

  cardRouter.use(authMiddleware)

  cardRouter.post('/addCard', (req, res) => {
    // check if card exists
    // send error if so.
    // if not add new card
  })

  cardRouter.put('/updateCard/:cardId', (req, res) => {
    // find card by ID
    // update info
  })

  return cardRouter
}
