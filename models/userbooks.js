var mongoose = require('mongoose');
var schema = mongoose.Schema({Name: String, User: String, Bookid: String, Bookimg: String});

module.exports = mongoose.model('userbooks', schema);