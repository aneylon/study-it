var mongoose = require('mongoose')
var Schema = mongoose.Schema;

module.exports = mongoose.model('Card', new Schema({
    question: String,
    answer: String,
    explain: String
}));