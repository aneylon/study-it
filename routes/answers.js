// route for saving user answers
const authMiddleware = require('../middleware/auth')

module.exports = function(express){
  let answerRouter = express.Router()


  answerRouter.use(authMiddleware)

  answerRouter.post('/saveAnswer', (req, res) => {

  })

  answerRouter.get('/allAnswers', (req, res) => {
    res.send('got all answers')
  })

  return answerRouter
}
