# [Final Project: What's Happening, an events posting board - ](https://www2.cs.duke.edu/courses/compsci290.2/spring18/assign/final_project/)
#### Author: Junbo Li(jl781), Wenqian Tong(wt57)

#### Estimated working hours: 100+ hours

---------
#### What makes your application useful:
---------

**Answer**:

The design of our app is shown earlier in our plan and topic report. We wanted to create an application that is able to help students/faculties to track the events happening on campus. Information sharing across multiple users is the core. For example, as a participant/event seeker, by simply logging, he/she is able to see all kinds of the events. Of course, he/she can choose to filter which type of events he/she likes. Moreover, the event seeker can book/unbook the event to remind himself. A google map is provided for him to better visualize the location of his booked events.

On the perspective of an event host, he/she is able to post an event and all users(even without logging in) can see it. Moreover, the host can send a customized email to all of the users who booked his events. The email reminder integrated the weather API, in which it will notify the user of the current weather.

We also have administrator. Admin has a unique accound `admin` and he is able to see all of the user information. Moreover, he is able to delete any users or available events.


-----------
#### Methods/Tech Stack
-----------
Technologies used are
1. Backend
    * MongoDB
    * Express as the framework for Node.js (server side)
2. Frontend
    * Vue as the frame work (client side)
4. Third-party API
    * nodemailer (used for sending email reminders)
    * WounderGround (used for sending customized email event reminder)
    * Google Map/Google-geocoder (used for visualization event location)
4. Hosting
    * Github (client side)
    * Heroku (server side + database)

---------
#### Special instructions:
---------

**Answer**:
There is no special instruction. Simply visit https://github.com/duke-compsci290-spring2018/final-project-39 and you are able to start to track what's happening around you!

(For personal reminder: At root level of this project, run `$git subtree push --prefix src/server heroku master` to deploy the server side/app to heroku.

---------
#### Data reference:
---------

**Answer**:
Since the first stage of our app is to serve Duke community, thus, the static/initial data we
are going to use is sourced from Duke Event calendar. At the very bottom of the page
(http://calendar.duke.edu/), there is an URL builder (http://urlbuilder.calendar.duke.edu/). From
here, we are able to retrieve the data that both happened before and in the future (in 90 days).
Here is a link if you want to take a look what the data looks like
(http://calendar.duke.edu/events/index.json?&future_days=45). Moreover, our app relies on the the input data from users.

---------
#### Pros and the cons of different framework possibilities
---------

**Answer**: In terms of the technology we are going to use. For frontend/client side, the framework we used is Vue, since we have done the project Trello so we are pretty familiar with Vue. In term of the backend/server side, we used node.js and the framework Express, since this is kinda of the default choice for server side. As for the database, we picked MongoDB as it is a NoSQL database where information is stored in json format, which is what we desired.
