// model for Cards
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const CardSchema = new Schema({
  question: { type: String, required: true},
  answer: { type: String, required: true},
  explain: { type: String, required: true}
})

// methods for updating fields?

module.exports = mongoose.model('Card', CardSchema)
