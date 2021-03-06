/* Connect to db*/
var mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost/events");
mongoose.connect("mongodb://jl781:jl781@ds263759.mlab.com:63759/heroku_wv75rl6z");

var schema = new mongoose.Schema({
    'eid': Number,
    'title': String,
    'summary': String,
    'location': String,
    'position': {
        'lat': Number,
        'lng': Number
    },
    'time': String,
    'category': String
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
