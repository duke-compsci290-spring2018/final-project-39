var express = require('express');
var router = express.Router();

/* Connect to db*/
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/events");
var schema = new mongoose.Schema(
    { 'eid': Number,
      'title': String,
      'location': String,
      'time': String
});

var temp = mongoose.model('events', schema);

/* Add to db*/
// new temp({
//     'eid': 3,
//     'title': 'Web Final',
//     'location': 'UNC',
//     'time': 'Tomorrow'
// }).save(function(err, doc) {
//     console.log(doc);
// })


/* Find from db*/
var result;
temp.find(function(err, doc) {
    // console.log(doc);
    result = doc;
})

/* Remove from db*/
// temp.remove({"eid": 3}, function(err){
//     console.log(err);
// });

/* Update from db*/
// temp.update({"eid": 0}, {$set:{"title": "5v5 Basketball"}}, function(err, raw){
//     console.log(raw);
// });

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(JSON.stringify(result));
  res.end();
  console.log(`${result.length} event(s) in database`)
});

module.exports = router;
