<template>
    <div id="app">
        <gmap-map
            :center="center"
            :zoom="12"
            @click="addMarker"
            style="height: 480px;"
        >
            <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center = m.position"
            ></gmap-marker>
        </gmap-map>
        <Todoform v-bind:isNewTodo="isNewTodo"
                  v-bind:host_events="host_events"
                  v-bind:new_todo="new_todo"
                  v-bind:all_events="all_events"
                  v-on:handle_submitOldEvent="handle_submitOldEvent()"
                  v-on:handle_submitNewEvent="handle_submitNewEvent()"></Todoform>
        <!-- You hosted events -->
        <Hostevents v-bind:isNewTodo="isNewTodo"
                  v-bind:host_events="host_events"
                  v-on:editTodo="handle_editTodo($event)"
                  v-on:handle_deleteEvent="handle_deleteEvent($event)"></Hostevents>

        <Allevents v-bind:all_events="all_events"
                   v-on:bookEvent="handle_bookEvent($event)"></Allevents>

        <Bookedevents v-bind:booked_events="booked_events"
                      v-on:deleteBookedevent="handle_deleteBooked($event)"></Bookedevents>

        <hr/>

        <h4>*Rules:</h4>
        <p>
        Please <a href="https://duke-compsci290-spring2018.github.io/assignments-portfolio-JunboLarryLi/final/final_project_topic.html">here</a> to see the topic of our project.
        </p>

        <hr/>
        <footer>
            This website is written by Junbo(Larry) and Wenqian(Mike) Tong</a>, and it will be continued.
            <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
            <br/>
            Copyright Larry and Mike 04/2018
        </footer>
    </div>
</template>

<script>
// load another component to be used in the standard Vue object
import Hostevents from './hostEvents.vue'
import Todoform from './todoForm.vue'
import Allevents from './allEvents.vue'
import Bookedevents from './bookedEvents.vue'

// load JSON file driectly as JavaScript data structure, not recommended for LARGE data files

// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'signedin',
    // NOTE in a component, data must be a function that returns a NEW version of the values
    data () {
        return {
            center: {
                lat: 35.99,
                lng: -78.89
            },
            markers: [
                {
                    position: { lat: 35.99, lng: -78.89}, // Durham, NC
                },
                {
                    position: { lat: 48.85, lng: 2.35},   // Paris, France
                }
            ],
            uid: null,
            cur_id: -1,
            isNewTodo: true,
            new_todo: {
                eid: -1,
                title: ' ',
                summary: ' ',
                time: ' ',
                location: ' ',
                category: ' '
            },
            all_events: [],  /* User hosted/registered events */
            booked_events: [], /* All events, read from db users */
            host_events: [], /* All events, read from db users */
            userInfo : null
        }
    },
    // components (HTML, CSS, and JS) used by this app
    components: {
        Hostevents,
        Todoform,
        Allevents,
        Bookedevents
    },
    methods: {
        listUserInfo () {
            console.log('listUserInfo() called');
            console.log('uid: ', this.uid);
            fetch('http://localhost:3000/users/' + this.uid, { method: 'GET' })
                .then(response => response.json())
                .then(data => this.userInfo = data) // read user's data
                .then(data => console.log(this.userInfo))
                .then(data => fetch(`http://localhost:3000`, { method: 'GET' }))
                .then(response => response.json())
                .then(data => this.all_events = data) // read in all events
                .then(data => {
                    // populate host_events
                    this.host_events = [];
                    for (var key in this.userInfo['host_events']) {
                        var eid = this.userInfo['host_events'][key];
                        for (var key in this.all_events) {
                            var e = this.all_events[key];
                            if (e['eid'] === eid) {
                                this.host_events.push(e);
                            }
                        }
                    }

                    // populate booked_events
                    this.booked_events = [];
                    for (var key in this.userInfo['booked_events']) {
                        var eid = this.userInfo['booked_events'][key];
                        for (var key in this.all_events) {
                            var e = this.all_events[key];
                            if (e['eid'] === eid) {
                                this.booked_events.push(e);
                            }
                        }
                    }
                })
                .then(data => console.log("love life"))
                .then(data => console.log(this.all_events))
                .catch(error => console.log(error))
        },
        // listEvents () {
        //     console.log('listEvents() called');
        //     fetch(`http://localhost:3000`, { method: 'GET' }) // visit schema events to grab all events
        //         .then(response => response.json())
        //         .then(data => this.all_events = data)
        //         .then(data => console.log(this.all_events))
        //         .catch(error => console.log(error))
        // },
        handle_bookEvent(e) {
            this.userInfo['booked_events'].push(e['eid']);
            fetch(`http://localhost:3000/update_booked_events`, {
                method: 'POST',
                body: JSON.stringify(this.userInfo),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listUserInfo())
              .catch(error => console.log(error))
        },
        handle_submitOldEvent() {
            fetch(`http://localhost:3000/edit_registered_event`, {
                method: 'POST',
                body: JSON.stringify(this.new_todo),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listUserInfo())
              .catch(error => console.log(error))
            this.isNewTodo = true;
            this.resetInputValues();
        },
        handle_submitNewEvent() {
            this.userInfo['host_events'].push(this.new_todo['eid']);
            this.userInfo['booked_events'].push(this.new_todo['eid']);
            fetch(`http://localhost:3000/register_event`, {
                method: 'POST',
                body: JSON.stringify({
                    'new_todo': this.new_todo,
                    'new_userInfo': this.userInfo
                }),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listUserInfo())
              .catch(error => console.log(error))
            this.resetInputValues();
        },
        handle_deleteEvent(todo) {
            console.log("called from handle_deleteEvent()");
            console.log(todo);
            fetch(`http://localhost:3000/delete_event`, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listUserInfo())
              .catch(error => console.log(error))
        },
        handle_editTodo (todo){
            this.isNewTodo = false,
            this.new_todo = JSON.parse(JSON.stringify(todo)); //https://medium.com/@tkssharma/objects-in-javascript-object-assign-deep-copy-64106c9aefab
            console.log(this.all_events);
        },
        handle_deleteBooked(event) {
            console.log("called from delete booked event");
            //console.log(event);
            var to_delete = event['eid'];
            for (var i in this.host_events){
                // console.log(i, to_delete);
                // console.log(this.host_events);
                if (this.host_events[i]['eid'] === to_delete){
                    alert("You are the host of this event!");
                    return;
                }
            }
            console.log(this.userInfo['booked_events']);
            console.log(to_delete);
            for (var i in this.userInfo['booked_events']) {
                if (this.userInfo['booked_events'][i] === to_delete) {
                    this.userInfo['booked_events'].splice(i, 1);
                }
            }
            console.log(this.userInfo['booked_events'])
            fetch(`http://localhost:3000/update_booked_events`, {
                method: 'POST',
                body: JSON.stringify(this.userInfo),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listUserInfo())
            .catch(error => console.log(error))
        },
        addMarker (event) {
            this.markers.push({
                position: { lat: event.latLng.lat(), lng: event.latLng.lng() }
            })
        },
        resetInputValues() {
            this.new_todo = {
                id: -1,
                title: ' ',
                summary: ' ',
                time: ' ',
                location: ' ',
                category:' '
            }
        }
    },
    mounted () {
        this.listUserInfo(); // grab from schema users
    },
    created() {
        console.log("from created()");
        console.log(this.$route.params.uid);
        this.uid = this.$route.params.uid;
    }
}
</script>
