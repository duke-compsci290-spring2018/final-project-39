<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="todo-list">
        <h2 id="title">All available events</h2>
        <ul class="list-group">
            <li v-for="(e, index) in all_events">
                <span title="click me to book this event" class="list-item" @click="$emit('bookEvent', e)">
                    {{ e['title'] }} @ {{ e['time'] }} @ {{ e['location'] }} @ {{ e['category'] }} </span>
            </li>
        </ul>
    </div>
</template>
<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'allEvents',
    props: ['all_events'],
    data () {
        return {
        }
    },
    methods: {
    },
    created() {
        console.log("viper");
        console.log(this.all_events);
    }
}
</script>
