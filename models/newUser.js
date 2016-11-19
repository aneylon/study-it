// model for users
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const NewUserSchema = new Schema({
  name: String,
  password: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true }},
  admin: { type: Boolean, default: false}
})

NewUserSchema.pre('save', function(next) {
  let user = this
  if(!user.isModified('password')){
    return next()
  }
  bcrypt.genSalt(process.env.SALT, (err, res) => {
    if(err) return next(err)
    bcrypt.hash(user.password, null, null, (err, hash) => {
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
})

NewUserSchema.methods.comparePassword = function(password){
  let user = this
  return bcrypt.compareSync(password, user.password)
  // bcrypt.compare(password, user.password, (err, res) => {
  //   if(err) console.log('e', err)
  //   console.log('pw compare', res)
  //   return res
  // })
}

module.exports = mongoose.model('NewUser', NewUserSchema)
