var express = require('express');
var request = require('request');
var router = express.Router();

var events = require('./../database.js').events; // db interface
var users = require('./../database.js').users; // db interface

var WUNDERGROUND_API_KEY = require('./../settings.js').WUNDERGROUND_API_KEY;
var PRECIPITATING = require('./../settings.js').PRECIPITATING;
var geo = require('./../settings.js').geo;
var transporter = require('./../settings.js').transporter;

var mailOptions = {
    from: 'klaviyo2018junbo@gmail.com',
    to: [],
    subject: '',
    html: ``,
    attachments: [
        {
            filename: 'duke_logo.png',
            path: __dirname + '/../public/images/duke_logo.png',
            cid: 'logo'
    }] //https://community.nodemailer.com/using-embedded-images/
};

router.post('/send_email', function(req, res, next){
    console.log("Sending emails");
    console.log(req.body)
    var recipients = [];

    /* resrouce: https://stackoverflow.com/questions/25507866/how-can-i-use-a-cursor-foreach-in-mongodb-using-node-js */
    users.find({}).stream()
    .on('data', function(doc){
        // handle doc)
        if (doc.username != 'admin') {
            for (var i = 0; i < doc.booked_events.length; i++) {
                if (doc.booked_events[i] === req.body.eid) {
                    recipients.push(doc.email);
                }
            }
        }
    })
    .on('error', function(err){
        // handle error
        console.log(err)
    })
    .on('end', function(){
        // final callback
        // fetch the current weather condition at Durham, NC
        var weather_url = "http://api.wunderground.com/api/"+WUNDERGROUND_API_KEY+"/conditions/q/nc/durham.json";
        console.log(weather_url);
        request({
            url: weather_url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log("receipient list");
                console.log(recipients);
                mailOptions.to = recipients;
                var pic_normal = {
                    filename: 'email_content_normal.jpeg',
                    path: __dirname + '/../public/images/email_content_normal.jpeg',
                    cid: 'weather_img' //same cid value as in the html img src
                };

                var pic_rain = {
                    filename: 'email_content_rain.jpeg',
                    path: __dirname + '/../public/images/email_content_rain.jpeg',
                    cid: 'weather_img'
                };

                var pic_sunny = {
                    filename: 'email_content_sunny.jpeg',
                    path: __dirname + '/../public/images/email_content_sunny.jpeg',
                    cid: 'weather_img'
                };

                var cur_temp = body['current_observation']['temp_f'];
                var cur_weather = body['current_observation']['weather'];
                console.log("Weather query result");
                console.log(cur_temp); // typeof: number
                console.log(cur_weather);
                if (cur_weather === 'Clear') {
                    mailOptions.subject = "It's so nice out side! " + 'Your booked event ' + req.body.title + ' is coming up soon';
                    mailOptions.attachments.push(pic_sunny);
                }
                else if (PRECIPITATING.has(cur_weather)) {
                    mailOptions.subject = "Not so nice outside but your event " + req.body.title + ' is coming up soon. Remember to bring an umbrella!';
                    mailOptions.attachments.push(pic_rain);
                }
                else {
                    mailOptions.subject = 'Your booked event ' + req.body.title + ' is coming up soon';
                    mailOptions.attachments.push(pic_normal);
                }
                mailOptions.html = `
                    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
                    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

                    <html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
                      <head>
                        <link rel="stylesheet" type="text/css" href="css/app.css">
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        <meta name="viewport" content="width=device-width">
                        <title>Duke What's Happening Event Reminder</title>
                        <!-- <style> -->
                      </head>
                      <body>
                        <span class="preheader"></span>
                        <table class="body">
                          <tr>
                            <td class="center" align="center" valign="top">
                              <center data-parsed="">

                                <table align="center" class="container header float-center"><tbody><tr><td>
                                  <table class="row"><tbody><tr>
                                    <th class="small-12 large-12 columns first last"><table><tr><th>
                                      <h1 class="text-center">Welcome to What's Happening Event Reminder</h1>

                                      <center data-parsed="">
                                        <h3>Check out the current weather at your location and be prepared for your upcoming event!</h3>
                                      </center>

                                    </th>
                    <th class="expander"></th></tr></table></th>
                                  </tr></tbody></table>
                                </td></tr></tbody></table>

                                <table align="center" class="container body-border float-center"><tbody><tr><td>
                                  <table class="row"><tbody><tr>
                                    <th class="small-12 large-12 columns first last"><table><tr><th>

                                      <table class="spacer"><tbody><tr><td height="32px" style="font-size:32px;line-height:32px;">&#xA0;</td></tr></tbody></table>

                                      <center data-parsed="">
                                        <p><img src="cid:weather_img" height="200" width="200"/></p>
                                      </center>

                                      <table class="spacer"><tbody><tr><td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td></tr></tbody></table>
                                      <h3>Your event reminder: </h3>
                                      <h4>Time: ${req.body.time}</h4>
                                      <h4>Location: ${req.body.location}</h4>
                                      <p>Summary: ${req.body.summary}</p>
                                      <h3>The weather in Durham, NC is ${cur_weather}, and the degree is ${cur_temp} F.</h3>

                                      <center data-parsed="">
                                        <table align="center" class="menu float-center"><tr><td><table><tr>
                                          <th class="menu-item float-center"><a href="https://www.facebook.com/DukeUniv/">Facebook</a></th>
                                          <th class="menu-item float-center"><a href="https://twitter.com/DukeU">Twitter</a></th>
                                          <th class="menu-item float-center"><a href="http://calendar.duke.edu/">Contact Us</a></th>
                                        </tr></table></td></tr></table>
                                      </center>

                                      <center data-parsed="">
                                        <p><img src="cid:logo" height="60" width="180"/></p>
                                      </center>
                                    </th>
                    <th class="expander"></th></tr></table></th>
                                  </tr></tbody></table>

                                  <table class="spacer"><tbody><tr><td height="16px" style="font-size:16px;line-height:16px;">&#xA0;</td></tr></tbody></table>
                                </td></tr></tbody></table>

                              </center>
                            </td>
                          </tr>
                        </table>
                        <!-- prevent Gmail on iOS font size manipulation -->
                       <div style="display:none; white-space:nowrap; font:15px courier; line-height:0;"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div>
                      </body>
                    </html>
                `;
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send("Finish sending email reminders");
                        res.end();
                    }
                })
            }
        })
      });
});

/* Geocoder test */
router.post('/geocoder_test', function(req, res, next){
    console.log("Geocoder testing");
    console.log(req.body.address);

    // Google-geocoding
    geo.find(req.body.address, function(err, data){
      // process response object
      console.log(data[0]['location']['lat']);
      console.log(typeof data[0]['location']['lat']);
      res.send(data);
      res.end();
    });

    // Geocoding
    // geocoder.geocode(req.body.address, function ( err, data ) {
    //     console.log(data);
    //     res.send(JSON.stringify(data));
    //     res.end();
    // });
});

/* Get all events. */
router.get('/', function(req, res, next) {
    events.find(function(err, doc) {
        // console.log(doc);
        res.send(JSON.stringify(doc));
        res.end();
        console.log(`${doc.length} event(s) in database`)
    });
});

/* Add new event to db*/
router.post('/register_event', function(req, res, next) {
    console.log("Regsiter a new event to db");
    console.log(req.body);

    // Google-geocoding
    geo.find(req.body.new_todo.location, function(err, data){
        new events({
            'eid': req.body.new_todo.eid,
            'title': req.body.new_todo.title,
            'summary': req.body.new_todo.summary,
            'location': req.body.new_todo.location,
            'position': data[0]['location'],
            'time': req.body.new_todo.time,
            'category': req.body.new_todo.category
        }).save(function(err, doc) {
            console.log(doc);
            users.update({"_id": req.body.new_userInfo._id}, {$set:
                {
                    "booked_events":req.body.new_userInfo.booked_events,
                    "host_events":req.body.new_userInfo.host_events
                }
            }, function(err, raw)
                {
                    console.log(raw);
                    res.send('Finish adding a new event to db');
                    res.end();
                })
          })
    });
})

/* Update event */
router.post('/edit_registered_event', function(req, res, next) {
    console.log("edit_registered_event to db");
    console.log(req.body);

    geo.find(req.body.location, function(err, data){
      events.update({"eid": req.body.eid}, {$set:
            {
                "title": req.body.title,
                'summary': req.body.summary,
                'location': req.body.location,
                'position': data[0]['location'],
                'time': req.body.time,
                'category': req.body.category }}, function(err, raw) {
                    console.log(raw);
                    res.send('Finish editing an old event to db');
                    res.end();
                });
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
