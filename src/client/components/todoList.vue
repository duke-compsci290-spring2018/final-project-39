<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="todo-list">
        <h2 id="title">Your Events - Click List to Modify</h2>
        <ul class="list-group">
            <li v-for="(todo, index) in todos">
                <span title="click me to update this item" class="list-item" @click="$emit('editTodo', todo)">
                    {{ todo['text'] }} @ {{ todo['time'] }} @ {{ todo['location'] }} </span>
                <button @click="deleteTodo(todo)"  class="btn btn-danger" href="#">X</button>
            </li>
        </ul>
    </div>
</template>

<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'todoList',
    props: ['isNewTodo', 'todos'],
    data () {
        return {

        }
    },
    methods: {
        deleteTodo(todo) {
            for (var i = 0; i < this.todos.length; i++) {
                if (this.todos[i].id == todo.id) {
                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
                    this.todos.splice(i, 1);
                    for (var j = i; j < this.todos.length; j++)
                        this.todos[j].id--;
                    return;
                }
            }
        }
    }
}
</script>
