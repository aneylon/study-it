// routes for interacting with Cards
'use strict'
const authMiddleware = require('../middleware/auth')
const NewCard = require('../models/newCard')
const ObjectId = require('mongodb').ObjectID

module.exports = function(express){
  let cardRouter = express.Router()

  cardRouter.get('/allcards/:deckName', (req, res) => {
    // get all cards with a specific deck name
    res.send('got all cards')
  })

  cardRouter.use(authMiddleware)

  cardRouter.post('/addCard', (req, res) => {
    // IF ADMIN!!!
    NewCard.findOne({question: req.body.question}, (err, card) => {
      if(!card){
        let cardToAdd = new NewCard()
        cardToAdd.question = req.body.question
        cardToAdd.answer = req.body.answer
        cardToAdd.explain = req.body.explain

        cardToAdd.save((err, card) => {
          if(err) console.log(err)
          // add card to deck
        })
        res.send('added new card')
      } else {
        res.send('card exists')
      }
    })
  })

  cardRouter.put('/updateCard/:cardId', (req, res) => {

    // IF ADMIN!!!
    let updateObj = {}
    if(req.body.question) updateObj.question = req.body.question
    if(req.body.answer) updateObj.answer = req.body.answer
    if(req.body.explain) updateObj.explain = req.body.explain

    NewCard.findOneAndUpdate({_id: new ObjectId(req.params.cardId)},
      {$set: updateObj},
      { new: true, upsert: true },
      (err, card) => {
        if(err) console.log(err)
      })
    res.send('updated card')
  })

  return cardRouter
}
