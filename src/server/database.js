/* Connect to db*/
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/events");
var schema = new mongoose.Schema({
    'eid': Number,
    'title': String,
    'summary': String,
    'location': String,
    'time': String
});
var events = mongoose.model('events', schema);


var schema2 = new mongoose.Schema({
    'uid': Number,
    'username': String,
    'password': String,
    'email': String,
    'booked_events': [Number],
    'host_events': [Number]
});
var users = mongoose.model('users', schema2);

module.exports.events = events;
module.exports.users = users;
