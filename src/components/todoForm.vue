<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div>
        <h3>Event Registration Form</h3>
        <div id="todo-form">
            <!-- @submit handles any form of submission. -->
            <!-- .prevent keeps the event from bubbling around and doing anything else. -->
            <form @submit.prevent="onSubmit">
                <label>
                    Event Title
                    <input type="textarea" v-model="new_todo.text" value='' class="form-control"/>
                </label>


                <label>
                    Summary
                    <textarea rows="4" cols="50" v-model="new_todo.summary" name="comment" form="usrform"> Enter text here...</textarea>
                </label>

                <label>Location
                    <select v-model="new_todo.location">
                        <option value="Duke">Duke</option>
                        <option value="UNC">UNC</option>
                    </select>
                </label>

                <label>Event Schedule
                    <input type="date" v-model="new_todo.time" name="eventSchedule"/>
                </label>

                <input type="submit" class="btn btn-primary"/>
            </form>
        </div>
    </div>
</template>

<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'todoForm',
    props: ['isNewTodo', 'new_todo', 'todos'],
    data () {
        return {

        }
    },
    methods: {
        onSubmit() {
            var description = this.new_todo.text.trim();
            if (!description){
                alert('Description cannot be blank!');
                return;
            }
            if (!this.isNewTodo) {
                console.log('update item');
                // console.log(this.new_todo);
                var idx = this.new_todo['id'] - 1;
                console.log(idx);
                this.todos[idx]['text'] = this.new_todo['text'];
                this.todos[idx]['summary'] = this.new_todo['summary'];
                this.todos[idx]['time'] = this.new_todo['time'];
                this.todos[idx]['location'] = this.new_todo['location'];
                this.isNewTodo = true;
            }
            else {
                this.new_todo['id'] = this.todos.length+1;
                this.todos.push(this.new_todo);
            }
            this.new_todo = {
                id: -1,
                text: ' ',
                summary: ' ',
                time: ' ',
                location: ' '
            }
        }
    }
}
</script>
