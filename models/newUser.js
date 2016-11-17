// model for users
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  name: String,
  password: {type: String, required: true, select: false },
  email: { type: String, required: true, index: { unique: true }},
  admin: { type: Boolean, default: false}
})

UserSchema.pre('save', (next) => {
  let user = this
  if(!user.isModified('password')) return next()

  bcrypt.hash(user.password, null, null, (err, hash) => {
    if(err) return next(err)

    user.password = hash
    next()
  })
})

UserSchema.methods.comparePassword = (password) => {
  let user = this
  return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model('User', UserSchema)
