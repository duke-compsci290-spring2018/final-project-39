var express = require('express');
var router = express.Router();
var events = require('./../database.js').events; // db interface
var users = require('./../database.js').users; // db interface

/* Get all events. */
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
        'eid': req.body.new_todo.eid,
        'title': req.body.new_todo.title,
        'summary': req.body.new_todo.summary,
        'location': req.body.new_todo.location,
        'time': req.body.new_todo.time,
        'category': req.body.new_todo.category
    }).save(function(err, doc) {
        console.log(doc);
        console.log('8888888888888888');
        console.log('66666666666666666666');
        console.log('2333333', req.body.new_userInfo);
        users.update({"_id": req.body.new_userInfo._id}, {$set:
            {
                "booked_events":req.body.new_userInfo.booked_events,
                "host_events":req.body.new_userInfo.host_events
            }
        }, function(err, raw) {
                    console.log(raw);
                    res.send('Finish adding a new event to db');
                    res.end();
            })
        })
})

/* Update event */
router.post('/edit_registered_event', function(req, res, next) {
    console.log("edit_registered_event to db");
    console.log(req.body);
    events.update({"eid": req.body.eid}, {$set:
        {
            "title": req.body.title,
            'summary': req.body.summary,
            'location': req.body.location,
            'time': req.body.time,
            'category': req.body.category }}, function(err, raw) {
        console.log(raw);
        res.send('Finish editing an old event to db');
        res.end();
    });
})

/* Unbook/Book an event, update schema users */
router.post('/update_booked_events', function(req, res, next) {
    console.log("book/unbook an event to db");
    console.log('body is: ', req.body);
    console.log(req.body._id);
    users.update({"_id": req.body._id}, {$set:{"booked_events":req.body.booked_events}}, function(err, raw) {
        console.log(raw);
        res.send('Finish book/unbooking an event to db');
        res.end();
    })
})



/* Previous version: Remove from db*/
// router.post('/delete_event', function(req, res, next) {
//     console.log("delete_event from db");
//     console.log(req.body);
//     events.remove({"eid": req.body.eid}, function(err){
//         console.log(err);
//         res.send('Finish deleting an event from db');
//         res.end();
//     });
// })

/* Host remove event - set to expire */
router.post('/delete_event', function(req, res, next) {
    events.update({"eid": req.body.eid}, {$set: {"title": "(*Note: Deleted by the host) " + req.body.title}}, function(err) {
        console.log(err);
        res.send('Finish deleting an event from db');
        res.end();
    });
})

/* Admin remove event - set to expire */
router.post('/admin_delete_event', function(req, res, next) {
    events.update({"eid": req.body.eid}, {$set: {"title": "(*Note: Deleted by the Adminstritor) " + req.body.title}}, function(err) {
        console.log(err);
        res.send('Finish deleting an event from db');
        res.end();
    });
})


module.exports = router;
