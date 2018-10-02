var mongoose = require('mongoose');
var schema = mongoose.Schema({id: {type: String,  unique: false},  title: String, img:String, price: String, link: String, seller: String, sizes: Array, rating: Number, handmade: Boolean, img_local: String, img_resized: String, website: String, userrating: {type: String, default: ''}  });

module.exports = mongoose.model('afrodresses', schema);