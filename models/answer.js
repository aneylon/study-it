// model for user answers
// model for Cards
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const AnswerSchema = new Schema({
  questionID: { type: String required: true },
  userID: { type: String, required: true},
  know: { type: Number, default: 0 },
  dontKnow: { type: Number, default: 0 },
  notSure: { type: Number, default: 0 }
})

// methods for updating fields?

module.exports = mongoose.model('Answer', AnswerSchema)
