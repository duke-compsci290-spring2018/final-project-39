var express = require('express');
var router = express.Router();
var temp = require('./../database.js'); // db interface

/* GET User login check. */
router.get('/search', function(req, res, next) {
    console.log(req.query.name);
    console.log(req.query.password);
    //res.send('Hello!  ' + req.query.name + req.query.password);
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

module.exports = router;
