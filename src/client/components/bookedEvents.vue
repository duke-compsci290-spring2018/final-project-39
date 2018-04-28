<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="booked-events">
        <h2 id="title">You booked events</h2>
        <ul class="list-group">
            <li v-for="(e, index) in booked_events">
                <span class="list-item">
                    {{ e['title'] }} @ {{ e['time'] }} @ {{ e['location'] }} @ {{ e['category'] }}
                 <button @click="deletebooked(e)"  class="btn btn-danger">X</button>
                     </span>
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
        deletebooked(event) {
            this.$emit('deleteBookedevent', event);
        }
    },
    created() {
        console.log("In bookedEvents component");
        console.log("booked_events");
    }
}
</script>
