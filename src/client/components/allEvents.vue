<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="all-event">
        <h2 id="title">All available events</h2>
        <ul>
            <Card v-for="(e, index) in all_events" 
                 class="event" :class="e['category']" 
                 v-bind:event="e" v-on:bookEvent="book(e)">
                <!-- <span title="click me to book this event" class="list-item" @click="$emit('bookEvent', e)">
                    {{ e['title'] }} @ {{ e['time'] }} @ {{ e['location'] }} @ {{ e['category'] }}
                </span> -->                
                <!-- <ul>
                <Card v-bind:event="e">
                </Card>
                </ul> -->
            </Card>
        </ul>
    </div>
</template>
<script>
// export anonymous object from this module so it can be accessed by others when imported
import Card from './Card.vue'
export default {
    name: 'allEvents',
    props: ['all_events'],
    data () {
        return {
        }
    },
    components: {
        Card
    },
    methods: {
        book (e){
            this.$emit('bookEvent', e);
        }
    },
    created() {
        //console.log("viper");
        //console.log(this.all_events);
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