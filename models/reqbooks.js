var mongoose = require('mongoose');
var schema = mongoose.Schema({Bookname: String, Bookreq: String, Bookid: String, Bookimg: String, Bookowner: String});

module.exports = mongoose.model('reqbooks', schema);