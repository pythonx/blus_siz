var mongoose = require('mongoose');
var schema = mongoose.Schema({origin: String, dest: String, origin_aport: String, dest_aport: String, depdate: String, arrdate: String, triptype: String, tripclass: String, airline: String, fare: String});

module.exports = mongoose.model('flightdeals', schema);