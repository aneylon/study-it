var express = require('express');
var router = express.Router();

router.get('/api/setup', function(req, res){
  var card = new Card({
    question: 'does this work?',
    answer: 'yes it does.',
    explain: 'cause you did it right.'
  });
  card.save(function(err){
    if(err) throw err;
    console.log('saved new card');
    res.json({ success: true });
  });
});

router.get('/api/getIt', function(req, res){
  // console.log('got it');
  res.send('got it');
});

router.get('/api/libs/:libName', function(req, res){
  var libName = req.params.libName;
  res.send('loaded'+ libName);
});

router.post('/api/signUp', function(req, res){
  // check if user exists
  //   if exists send error
  //   else add user and send confirmation
  console.log(req.body);
  res.send('signed up ' + JSON.stringify(req.body));
});

router.post('/api/signIn', function(req, res){
  console.log(req.body);
  res.send('signing in ' + JSON.stringify(req.body));
})

router.post('/api/postIt', function(req, res){
  console.log(req.body);
  // console.log('posted it');
  res.send('posted it' + JSON.stringify(req.body));
});

router.post('/api/loadLib', function(req, res){
  // make post request with name of lib to load {name : 'libName'}
  var libName = req.body.name;
  console.log('looking for', libName);
  // get ref to DB?
  // libName.find({}, function(err, results){
  //  res.json(results);
  // })
  res.send('looking for ' + libName);
});

module.exports = router;
