<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="host-events">
        <h2 id="title">Your hosted events - Click List to Modify</h2>
        <ul>
            <!-- <li v-for="(e, index) in host_events">
                <button @click="send_reminder(e)">Send email reminder</button>
                <span title="click me to update this item" class="list-item" @click="$emit('editTodo', e)">
                    {{ e['title'] }} @ {{ e['time'] }} @ {{ e['location'] }} @ {{ e['category'] }} </span>
                <button @click="deleteTodo(e)"  class="btn btn-danger" href="#">X</button>
            </li> -->
            <Card3 v-for="(e, index) in host_events" 
                 v-bind:event="e" 
                 v-on:deleteEvent="deleteTodo(e)"
                 v-on:editEvent="$emit('editTodo', e)"
                 v-on:sendEmail="send_reminder(e)">
            </Card3>
        </ul>
    </div>
</template>

<script>

import Card3 from './Card3.vue'
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'hostEvents',
    props: ['isNewTodo', 'host_events'],
    data () {
        return {

        }
    },
    components :{
        Card3
    },
    methods: {
        // editTodo(e) {
        //     this.$emit('editTodo', e);
        // },
        deleteTodo(e) {
            this.$emit('handle_deleteEvent', e);
            // for (var i = 0; i < this.host_events.length; i++) {
            //     if (this.host_events[i].eid == todo.eid) {
            //         //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            //         this.host_events.splice(i, 1);
            //         for (var j = i; j < this.host_events.length; j++)
            //             this.host_events[j].eid--;
            //         return;
            //     }
            // }
        },
        send_reminder(e) {
            fetch(`http://localhost:3000/send_email`, {
                method: 'POST',
                body: JSON.stringify(e),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }
    }
}
</script>

<style scoped lang="scss">
  ul {
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax( 320px, auto ) );
    grid-gap: 1rem;
  }
</style>
