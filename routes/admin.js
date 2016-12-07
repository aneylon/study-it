// routes for admin users
'use strict'
const authMiddleware = require('../middleware/auth')
const NewUser = require('../models/newUser')
const ObjectId = require('mongodb').ObjectID

module.exports = function(express){
  let adminRouter = express.Router()

  adminRouter.use(authMiddleware)

  adminRouter.put('/makeAdmin/:userId', (req, res) => {
    // IF ADMIN!!!
    // modify the admin field of a user
    const userId = req.params.userId
    const newAdminStatus = req.body.newAdminStatus

    NewUser.findOneAndUpdate({'_id': new ObjectId(userId)},
    { $set: { admin: newAdminStatus }},
    { new: true, upsert: true },(err, user) => {
      if(err) console.log(err)
    })

    res.send('sent it')
  })

  adminRouter.get('/allUsers', (req, res) => {
    // IF ADMIN!!!
    NewUser.find({}, (err, docs) => {
      if(err) console.log(err)
      else res.send(docs)
    })
    // res.send('got all users')
  })

  return adminRouter
}
