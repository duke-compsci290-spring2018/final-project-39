<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="todo-list">
        <h3 id="title">All available events</h3>
        <ul class="list-group">
            <li v-for="(e, index) in all_events">
                <span class="list-item" @click="$emit('bookEvent', e)">
                    {{ e['title'] }} @ {{ e['time'] }} @ {{ e['location'] }} </span>
                <button type="button" class="btn btn-danger" v-on:click="$emit('deleteEvent', e)">X</button>
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
    created() {
        //console.log("viper");
        //console.log(this.all_events);
    }
}
</script>
