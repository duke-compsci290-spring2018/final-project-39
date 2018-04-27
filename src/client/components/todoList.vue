<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="todo-list">
        <h2 id="title">Your hosted events - Click List to Modify</h2>
        <ul class="list-group">
            <li v-for="(todo, index) in host_events">
                <span title="click me to update this item" class="list-item" @click="$emit('editTodo', todo)">
                    {{ todo['title'] }} @ {{ todo['time'] }} @ {{ todo['location'] }} </span>
                <button @click="deleteTodo(todo)"  class="btn btn-danger" href="#">X</button>
            </li>
        </ul>
    </div>
</template>

<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'todoList',
    props: ['isNewTodo', 'host_events'],
    data () {
        return {

        }
    },
    methods: {
        deleteTodo(todo) {
            this.$emit('handle_deleteEvent', todo);
            // for (var i = 0; i < this.host_events.length; i++) {
            //     if (this.host_events[i].eid == todo.eid) {
            //         //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
            //         this.host_events.splice(i, 1);
            //         for (var j = i; j < this.host_events.length; j++)
            //             this.host_events[j].eid--;
            //         return;
            //     }
            // }
        }
    }
}
</script>
