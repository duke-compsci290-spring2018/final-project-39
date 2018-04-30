<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="booked-events">
        <h2 id="title">You booked events</h2>
        <ul>
            <!-- <li v-for="(e, index) in booked_events">
                <span class="list-item">
                    {{ e['title'] }} @ {{ e['time'] }} @ {{ e['location'] }} @ {{ e['category'] }}
                 <button @click="deletebooked(e)"  class="btn btn-danger">X</button>
                     </span>
            </li> -->
            <Card2 v-for="(e, index) in booked_events" 
                 v-bind:event="e" v-on:deleteEvent="deletebooked(e)">
            </Card2>
        </ul>
    </div>
</template>
<script>

import Card2 from './Card2.vue'
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'bookedEvents',
    props: ['booked_events'],
    data () {
        return {
        }
    },
    components: {
     Card2
    },
    methods: {
        deletebooked(event) {
            this.$emit('deleteBookedevent', event);
        }
    },
    created() {
       // console.log("In bookedEvents component");
       // console.log("booked_events");
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