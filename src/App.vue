<template>
    <div id="app">
      <button @click="toggle('math')" v-if="!is_show_math && !is_show_geography && !is_show_nba">math quiz</button>
      <Quiz v-if="is_show_math"
            v-bind:toggle="toggle"
            v-bind:quiz="math"
            style="background-color:lightgreen">
      </Quiz>

      <button @click="toggle('geography')" v-if="!is_show_math && !is_show_geography && !is_show_nba">geography quiz</button>
      <Quiz v-if="is_show_geography"
            v-bind:toggle="toggle"
            v-bind:quiz="geography"
            style="font-family: cursive;
                   background-color: lightblue">
      </Quiz>

      <button @click="toggle('nba')" v-if="!is_show_math && !is_show_geography && !is_show_nba">NBA quiz</button>
      <Quiz v-if="is_show_nba"
            v-bind:toggle="toggle"
            v-bind:quiz="nba"
            style="font-family: fantasy;
                   background-color: lightpink">
      </Quiz>

      <hr/>

      <h4>*Rules:</h4>
      <p>
        Please <a href="https://duke-compsci290-spring2018.github.io/assignments-portfolio-JunboLarryLi/final/final_project_topic.html">here</a> to see the topic of our project.
      </p>

      <hr/>
      <footer>
        This website is written by Junbo(Larry) and Wenqian(Mike) Tong</a>, and it will be continued.
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
        <br/>
        Copyright Larry and Mike 04/2018
      </footer>
    </div>
</template>

<script>
// load another component to be used in the standard Vue object
import Quiz from './components/Quiz.vue'
// load JSON file driectly as JavaScript data structure, not recommended for LARGE data files

// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'app',
    // NOTE in a component, data must be a function that returns a NEW version of the values
    data () {
        return {
            is_show_math: false,
            is_show_geography: false,
            is_show_nba: false,
            math: "math",
            geography: "geography",
            nba: "nba"
        }
    },
    // components (HTML, CSS, and JS) used by this app
    components: {
        Quiz
    },
    methods: {
      toggle: function(subject) {
        if (subject === "math")
          this.is_show_math = !this.is_show_math;
        else if (subject == "geography")
          this.is_show_geography = !this.is_show_geography;
        else if (subject == 'nba')
          this.is_show_nba = !this.is_show_nba;
      }
    }
}
</script>

<style lang="scss" scoped>
$header-color: hotpink;

h1 {
    color: $header-color;
}
</style>
