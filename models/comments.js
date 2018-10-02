var mongoose = require('mongoose');
var schema = mongoose.Schema({id: String, parent: {}, created: String, created_by_current_user :Boolean, fullname: String, modified: String, content: String, profile_picture_url:String,upvote_count: String, user_has_upvoted: Boolean});

module.exports = mongoose.model('comments', schema);


// var abc = {id: String, parent: {}, created: String, created_by_current_user :Boolean, fullname: String, 
// modified: String, content: String, profile_picture_url:String,
// upvote_count: String, user_has_upvoted: Boolean};