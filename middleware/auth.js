// middleware to check jwt for authorization
const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
  console.log('in the middle')
  next()

  // const token = req.body.token || req.query.token || req.headers['x-access-token']
  // if(token){
  //   jwt.verify(token, process.env.SECRET, (err, decoded)=>{
  //     if(err){
  //       return res.json({ success: false, message:'Failed to authenticate token.'})
  //     } else {
  //       req.decoded = decoded
  //       next()
  //     }
  //   });
  // } else {
  //   return res.status(403).send({ success: false, message:'No token provided'})
  // }

}
