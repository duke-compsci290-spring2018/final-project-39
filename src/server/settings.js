var nodemailer = require('nodemailer');
var geocoder = require('google-geocoder');

/* Weather query API */
var WUNDERGROUND_API_KEY = '761cf5ce0fbe75e7'
// Current Condition Phrases glossary
// https://www.wunderground.com/weather/api/d/docs?d=resources/phrase-glossary&MR=1
var PRECIPITATING = new Set([
    'Drizzle',
    'Rain',
    'Snow',
    'Snow Grains',
    'Ice Crystals',
    'Ice Pellets',
    'Hail',
    'Mist',
    'Fog',
    'Fog Patches',
    'Smoke',
    'Volcanic Ash',
    'Widespread Dust',
    'Sand',
    'Haze',
    'Spray',
    'Dust Whirls',
    'Sandstorm',
    'Low Drifting Snow',
    'Low Drifting Widespread Dust',
    'Low Drifting Sand',
    'Blowing Snow',
    'Blowing Widespread Dust',
    'Blowing Sand',
    'Rain Mist',
    'Rain Showers',
    'Snow Showers',
    'Snow Blowing Snow Mist',
    'Ice Pellet Showers',
    'Hail Showers',
    'Small Hail Showers',
    'Thunderstorm',
    'Thunderstorms and Rain',
    'Thunderstorms and Snow',
    'Thunderstorms and Ice Pellets',
    'Thunderstorms with Hail',
    'Thunderstorms with Small Hail',
    'Freezing Drizzle',
    'Freezing Rain',
    'Freezing Fog']);

var len = PRECIPITATING.length;
for (var i = 0; i < len; i++) {
    PRECIPITATING.add('Light ' + PRECIPITATING[i]);
    PRECIPITATING.add('Heavy ' + PRECIPITATING[i]);
}

/* Geocoder API (Physical address -> (lat, lng)) */
var geo = geocoder({
    key: 'AIzaSyB6H33ssoD0J3Iuu4RGUCiaXyuUVAPzmiI'
});


/* send email reminder of upcoming event */
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'klaviyo2018junbo@gmail.com',
    pass: 'klaviyo2018'
  }
});

module.exports.WUNDERGROUND_API_KEY = WUNDERGROUND_API_KEY;
module.exports.PRECIPITATING = PRECIPITATING;
module.exports.geo = geo;
module.exports.transporter = transporter;
