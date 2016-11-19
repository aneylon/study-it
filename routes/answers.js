// route for saving user answers
const authMiddleware = require('../middleware/auth')
const Answer = require('../models/answer')

module.exports = function(express){
  let answerRouter = express.Router()

  answerRouter.use(authMiddleware)

  answerRouter.post('/saveAnswer', (req, res) => {
    const cardId = req.body.cardId
    const userId = req.body.userId
    const fieldToUpdate = req.body.fieldToUpdate
    // fieldToUpdate must be 'know', 'dontKnow' or 'notSure'
    let incArg = {}
    incArg[fieldToUpdate] = 1

    Answer.findOneAndUpdate({cardId, userId},
      { $inc : incArg},
      {
        new: true,
        upsert: true
      },
      (err, answer) => {
        if(err) console.log(err)
        else console.log(answer)
      })
    res.send('saving user answer')
  })

  answerRouter.get('/allAnswers', (req, res) => {
    // if admin
    Answer.find({}, (err, answers) => {
      if(err) console.log(err)
      res.send(answers)
    })
  })

  return answerRouter
}
