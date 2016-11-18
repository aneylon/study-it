// model for users
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const NewUserSchema = new Schema({
  name: String,
  password: {type: String, required: true, select: false },
  email: { type: String, required: true, index: { unique: true }},
  admin: { type: Boolean, default: false}
})

NewUserSchema.pre('save', (next) => {
  let user = this
  // if(!user.isModified('password')) return next()

  bcrypt.hash(user.password, null, null, (err, hash) => {
    if(err) return next(err)
    console.log('hashed', hash)
    user.password = hash
    console.log(user.password)
    next()
  })
})

NewUserSchema.methods.comparePassword = (password) => {
  let user = this
  return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model('NewUser', NewUserSchema)
