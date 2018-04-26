var express = require('express');
var router = express.Router();
var temp = require('./../database.js'); // db interface

/* Find from db*/

/* GET home page. */
router.get('/', function(req, res, next) {
    var result;
    temp.find(function(err, doc) {
        // console.log(doc);
        result = doc;
    }).then(data => {
        res.send(JSON.stringify(result));
        res.end();
        console.log(`${result.length} event(s) in database`)
    });
});

/* Add new event to db*/
router.post('/register_event', function(req, res, next) {
    console.log("Regsiter a new event to db");
    console.log(req.body);
    new temp({
        'eid': req.body.eid,
        'title': req.body.title,
        'summary': req.body.summary,
        'location': req.body.location,
        'time': req.body.time
    }).save(function(err, doc) {
        console.log(doc);
    })
    res.send('Finish regsitering a new event to db');
    res.end();
})


/* Remove from db*/
// temp.remove({"eid": 3}, function(err){
//     console.log(err);
// });

/* Update from db*/
// temp.update({"eid": 0}, {$set:{"title": "5v5 Basketball"}}, function(err, raw){
//     console.log(raw);
// });

module.exports = router;
