/* Connect to db*/
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/events");
var schema = new mongoose.Schema(
    { 'eid': Number,
      'title': String,
      'summary': String,
      'location': String,
      'time': String
});
var temp = mongoose.model('events', schema);

module.exports = temp;
