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
                  v-bind:new_todo="new_todo"></Todoform>

        <Todolist v-bind:isNewTodo="isNewTodo"
                  v-bind:todos="todos"
                  v-on:editTodo="handle_editTodo($event)"></Todolist>

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
import Todolist from './components/todoList.vue'
import Todoform from './components/todoForm.vue'

// load JSON file driectly as JavaScript data structure, not recommended for LARGE data files

// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'app',
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
            cur_id: 0,
            isNewTodo: true,
            new_todo: {
                eid: -1,
                title: ' ',
                summary: ' ',
                time: ' ',
                location: ' '
            },
            todos: [
                // {
                //     id: 1,
                //     text: '3v3 Basketball Game',
                //     summary: ' ',
                //     time: '2018-04-15',
                //     location: 'Duke'
                // },
                // {
                //     id: 2,
                //     text: 'Spring Formal',
                //     summary: ' ',
                //     time: '2018-04-13',
                //     location: 'Duke'
                // },
                // {
                //     id: 3,
                //     text: 'Web Project Demo',
                //     summary: ' ',
                //     time: '2018-04-17',
                //     location: 'Duke'
                // }
            ]
        }
    },
    // components (HTML, CSS, and JS) used by this app
    components: {
        Todolist,
        Todoform
    },
    methods: {
        listEvents () {
            fetch(`http://localhost:3000`, { method: 'GET' })
                .then(response => response.json())
                .then(data => this.todos = data)
                .catch(error => console.log(error))
            console.log(this.todos);
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
        }
    },
    mounted () {
        this.listEvents();
    }
}
</script>
