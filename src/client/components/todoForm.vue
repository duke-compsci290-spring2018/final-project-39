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
                    <input type="textarea" v-model="new_todo.title" value='' class="form-control"/>
                </label>


                <label>
                    Summary
                    <textarea rows="4" cols="50" v-model="new_todo.summary" name="comment" form="usrform"> Enter text here...</textarea>
                </label>

                <label>
                    Location
                    <input type="textarea" v-model="new_todo.location" class="form-control"/>
                </label>

                <label>Category
                    <select v-model="new_todo.category">
                        <option v-for="category in categories" v-bind:value="category">
                            {{ category }}
                        </option>
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
    props: ['isNewTodo', 'new_todo', 'host_events', 'all_events', 'categories'],
    data () {
        return {

        }
    },
    methods: {
        onSubmit() {
            var description = this.new_todo.title.trim();
            if (!description){
                alert('Description cannot be blank!');
                return;
            }
            if (!this.isNewTodo) {
                console.log('update item');
                this.$emit('handle_submitOldEvent');
            }
            else {
                // this.new_todo['eid'] = this.host_events.length+1;
                if (this.all_events.length > 0) {
                    var last_idx = this.all_events.length - 1;
                    this.new_todo['eid'] = this.all_events[last_idx]['eid'] + 1;
                }
                else {
                    this.new_todo['eid'] = 0
                }
                this.$emit('handle_submitNewEvent');
            }
        }
    }
}
</script>
