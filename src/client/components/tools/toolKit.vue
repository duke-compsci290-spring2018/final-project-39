<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div id="tool-kit">
        <h1 id="title">You tools</h1>
        <h5>All events category filter</h5>
        <select v-model="selected" v-on:change="apply_visible_category">
            <option v-for="category in categories" v-bind:value="category" >
                {{ category }}
            </option>
        </select>

        </br>
        </br>
        <button>Send email reminder</button>
    </div>
</template>
<script>
// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'bookedEvents',
    props: ['booked_events', 'categories'],
    data () {
        return {
            selected: ''
        }
    },
    methods: {
        apply_visible_category() {
          console.log("apply visible category");
          // var a = ['a', 'b'];
          // console.log(typeof a);
          // console.log(a[1]);
          // console.log(this.categories[0]);
          var prefix = ".event.";
          if (this.selected === "All" || this.selected === '') {
            $(".event").css('display', '');
          }
          else {
            for (var i = 0; i < this.categories.length; i++) {
              var selector = prefix + this.categories[i];
              if (this.categories[i] != this.selected)
                $(selector).css('display', 'none');
              else
                $(selector).css('display', '');
            }
          }
        }
    },
    created() {
        console.log("In bookedEvents component");
        console.log("booked_events");
    }
}
</script>

<style>
#tool-kit {
    padding: 5px;
    margin: 10px;
    margin-left: 30%;
    margin-right: 30%;
    margin-bottom: 50px;
    border: solid;
}
</style>
