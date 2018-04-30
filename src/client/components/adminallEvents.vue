<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="todo-list">
        <h3 id="title">All available events</h3>
        <ul class="list-group">
            <!-- <li v-for="(e, index) in all_events">
                <span class="list-item" @click="$emit('bookEvent', e)">
                    {{ e['title'] }} @ {{ e['time'] }} @ {{ e['location'] }} </span>
                <button type="button" class="btn btn-danger" v-on:click="$emit('deleteEvent', e)">X</button>
            </li> -->            
            <Card4 v-for="(e, index) in all_events"
                 v-bind:event="e"
                 v-on:deleteEvent="deleteTodo(e)">
            </Card4>
        </ul>
    </div>
</template>
<script>

import Card4 from './Card4.vue'
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'allEvents',
    props: ['all_events'],
    data () {
        return {
        }
    },
    components: {
        Card4
    },
    methods : {
        deleteTodo(e) {
            this.$emit('deleteEvent', e);
        }
    }
}
</script>
