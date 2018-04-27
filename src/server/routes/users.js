var express = require('express');
var router = express.Router();
var users = require('./../database.js').users; // db interface

/* GET User login check. */
router.get('/search', function(req, res, next) {
    console.log(req.query.name);
    console.log(req.query.password);
    //res.send('Hello!  ' + req.query.name + req.query.password);

    users.find({"username": req.query.name, "password": req.query.password}, function(err, doc) {
        // console.log(err);
    }).then(data => {
        if (data.length > 0) {
            console.log("SUCCUESS!");
            console.log("Uid is: ", data[0].uid);
            res.send(200, { uid: data[0].uid });
        }
        else {
            console.log("FAILED!");
            res.send(200, { uid: -1 });
        }
        res.end();
    });
});

router.get('/:uid', function(req, res, next) {
    var uid = req.params.uid //grab :uid
    users.find({"uid": uid}, function(err, doc) {
        // console.log(err);
        console.log('from server doc');
        console.log(doc);
    }).then(data => {
        res.send(200, JSON.stringify(data[0]))
        res.end();
    });
});

module.exports = router;
