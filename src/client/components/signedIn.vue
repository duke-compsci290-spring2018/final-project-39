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
                  v-bind:todos="todos"
                  v-bind:new_todo="new_todo"
                  v-on:handle_submitOldEvent="handle_submitOldEvent()"
                  v-on:handle_submitNewEvent="handle_submitNewEvent()"></Todoform>

        <Todolist v-bind:isNewTodo="isNewTodo"
                  v-bind:todos="todos"
                  v-on:editTodo="handle_editTodo($event)"
                  v-on:handle_deleteEvent="handle_deleteEvent($event)"></Todolist>

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
import Todolist from './todoList.vue'
import Todoform from './todoForm.vue'

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
            cur_id: -1,
            isNewTodo: true,
            new_todo: {
                eid: -1,
                title: ' ',
                summary: ' ',
                time: ' ',
                location: ' '
            },
            todos: []
        }
    },
    // components (HTML, CSS, and JS) used by this app
    components: {
        Todolist,
        Todoform
    },
    methods: {
        listEvents () {
            console.log('listEvents() called');
            fetch(`http://localhost:3000`, { method: 'GET' })
                .then(response => response.json())
                .then(data => this.todos = data)
                .then(data => console.log(this.todos))
                .catch(error => console.log(error))
        },
        handle_submitOldEvent() {
            fetch(`http://localhost:3000/edit_registered_event`, {
                method: 'POST',
                body: JSON.stringify(this.new_todo),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listEvents())
              .catch(error => console.log(error))
            this.isNewTodo = true;
            this.resetInputValues();
        },
        handle_submitNewEvent() {
            fetch(`http://localhost:3000/register_event`, {
                method: 'POST',
                body: JSON.stringify(this.new_todo),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listEvents())
              .catch(error => console.log(error))
            this.resetInputValues();
        },
        handle_deleteEvent(todo) {
            fetch(`http://localhost:3000/delete_event`, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listEvents())
              .catch(error => console.log(error))
        },
        handle_editTodo (todo){
            this.isNewTodo = false,
            this.new_todo = JSON.parse(JSON.stringify(todo)); //https://medium.com/@tkssharma/objects-in-javascript-object-assign-deep-copy-64106c9aefab
            console.log(this.todos);
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
                location: ' '
            }
        }
    },
    mounted () {
        this.listEvents();
    }
}
</script>
