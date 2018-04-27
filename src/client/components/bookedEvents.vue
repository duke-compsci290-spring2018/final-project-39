<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="todo-list">
        <h2 id="title">You booked events</h2>
        <ul class="list-group">
            <li v-for="(e, index) in booked_events">
                <span title="click me to book this event" class="list-item">
                    {{ e['title'] }} @ {{ e['time'] }} @ {{ e['location'] }} </span>
            </li>
        </ul>
    </div>
</template>
<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'bookedEvents',
    props: ['booked_events'],
    data () {
        return {
        }
    },
    methods: {
    },
    created() {
        console.log("In bookedEvents component");
        console.log("booked_events");
    }
}
</script>
