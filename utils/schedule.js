var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
// rule.second = 01;
rule.minute = 01;
// rule.hour = 01;

// add ejs or other template
var ejs = require('ejs');
var fs = require('fs');
function readFile(file){
  var filepath = __dirname + '/' + file;
  return fs.readFileSync(filepath, 'utf8');
}
var template = readFile('./testEmail.ejs')
var body = ejs.render(template, {
  one: 'this is the first thing',
  two: [1,'a',true]
});

var apiKey = process.env.MAILGUN_KEY;
var domain = process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: apiKey, domain: domain});

var data = {
  from: 'Mailgun Sandbox <postmaster@sandbox692a40713c1447e793f8cf137e0f871f.mailgun.org>',
  to: 'arlen.m.neylon@gmail.com',
  subject: 'Testing Mailgun',
  html: body,
  text: 'Testing to see if Mailgun is working'
}

module.exports = schedule.scheduleJob(rule, function(){
  console.log('it is alive');
  mailgun.messages().send(data, function(err, body){
    console.log('sent mail');
    // console.log(body);
  })
});

// ToDo way to provide other information to make dynamic e-mails