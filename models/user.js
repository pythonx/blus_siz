var mongoose = require('mongoose');
var usrschema = mongoose.Schema({id:{type: String, default: null}, fname: String, username: String, dispname: String, password: String});
module.exports = mongoose.model('User', usrschema);