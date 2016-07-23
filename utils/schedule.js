var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.second = 01;

module.exports = schedule.scheduleJob(rule, function(){
  console.log('it is alive');
});