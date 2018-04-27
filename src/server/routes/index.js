var express = require('express');
var router = express.Router();
var events = require('./../database.js').events; // db interface
var users = require('./../database.js').users; // db interface

/* Find from db*/

/* GET home page. */
router.get('/', function(req, res, next) {
    var result;
    events.find(function(err, doc) {
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
    new events({
        'eid': req.body.eid,
        'title': req.body.title,
        'summary': req.body.summary,
        'location': req.body.location,
        'time': req.body.time
    }).save(function(err, doc) {
        console.log(doc);
        res.send('Finish regsitering a new event to db');
        res.end();
    })
})

/* Update from db*/
router.post('/edit_registered_event', function(req, res, next) {
    console.log("edit_registered_event to db");
    console.log(req.body);
    events.update({"eid": req.body.eid}, {$set:
        {"title": req.body.title,
        'summary': req.body.summary,
        'location': req.body.location,
        'time': req.body.time}}, function(err, raw) {
        console.log(raw);
        res.send('Finish editing an old event to db');
        res.end();
    });
})

/* Remove from db*/
router.post('/delete_event', function(req, res, next) {
    console.log("delete_event from db");
    console.log(req.body);
    events.remove({"eid": req.body.eid}, function(err){
        console.log(err);
        res.send('Finish deleting an event from db');
        res.end();
    });

})


module.exports = router;
