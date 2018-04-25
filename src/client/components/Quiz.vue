<template>
    <!-- template must have a SINGLE root tag that encloses all others -->
    <div>
      <div v-if="is_show_result">
        <h5> {{ msg }} </h5>
        <h5>Total questions: {{ myjson.length }} </h5>
        <h5>Total answered: {{ total_answered }} </h5>
        <h5>Total correct: {{ total_correct }} </h5>
        <h5>Correct percentage: {{ round }}%</h5>
      </div>
      <div v-else>
        <div> Q{{ cur_question_idx+1 }}/{{ myjson.length }}: {{ myjson[cur_question_idx]["question"] }} </div>
        <ul style="text-align:left">
          <li v-for="(choice, index) in myjson[cur_question_idx]['choices']">
            <input type="radio" :value="index" v-model="chosen" />
            {{ choice }}
          </li>
        </ul>
        <button v-bind:disabled="!exist_prev" @click="rollback">prev</button>
        <button @click="check"> submit </button>
        <button @click="next">next</button>
      </div>

      <button v-if="is_show_result" @click="toggle(quiz)">go to index page</button>
    </div>

</template>

<script>
import math_json from "../assets/quizes/math.json"
import geography_json from "../assets/quizes/geography.json"
import nba_json from "../assets/quizes/NBA.json"

// export anonymous object from this module so it can be accessed by others when imported
export default {
    name: 'Q',
    props: ['toggle', 'quiz'],
    data () {
        return {
            myjson: "",
            cur_question_idx: 0,
            answered_list: [],
            total_correct: 0,
            chosen: "",
            is_show_result: false,
            msg: ""
        }
    },
    created: function () {
      console.log("Created!");
      if (this.quiz === "math")
        this.myjson = math_json
      else if (this.quiz === "geography")
        this.myjson = geography_json
      else if (this.quiz === "nba")
        this.myjson = nba_json
      for (var i = 0; i < this.myjson.length; i++)
        this.answered_list.push(false);
      console.log("yoyoyoyo")
    },
    computed: {
      exist_prev: function() {
        for (var i = 0; i < this.cur_question_idx; i++)
        {
          if (this.answered_list[i] == false)
            return true;
        }
        return false;
      },
      total_answered: function () {
        var cnt = 0;
        for (var i = 0; i < this.myjson.length; i++)
        {
          if (this.answered_list[i] == true)
            cnt++;
        }
        return cnt;
      },
      round: function () {
        // reference: http://www.jacklmoore.com/notes/rounding-in-javascript/
        return Number(Math.round(this.total_correct/this.myjson.length*100+'e'+2)+'e-'+2);
      }

    },
    methods: {
      check() {
        if (this.chosen === "")
          return;
        if (this.chosen === this.myjson[this.cur_question_idx]["correctAnswer"])
          this.total_correct++;
        this.answered_list[this.cur_question_idx] = true;
        this.next();
      },
      next() {
        if (this.cur_question_idx == this.myjson.length - 1)
        {
          alert("Congrats! You finished it!");
          var percentage = this.total_correct/this.myjson.length;
          if (percentage > 0.6)
            this.msg = "You did super well on the quiz!";
          else if (percentage <= 0.6 && percentage >= 0.4)
            this.msg = "Your performance is ok.";
          else
            this.msg = "You need to work harder!";
          this.is_show_result = !this.is_show_result;
        }
        else
        {
          var i = this.cur_question_idx + 1;
          while (i < this.myjson.length && this.answered_list[i] == true)
            i++;
          this.cur_question_idx = i;
          this.chosen = "";
        }
      },
      rollback () {
        var i = this.cur_question_idx-1;
        while (i >= 0 && this.answered_list[i] == true)
            i--;
        if (i >= 0)
          this.cur_question_idx = i;
      }
    }
}
</script>

<style lang="scss" scoped>
/* NOTE, scoped limits style to ONLY tags within this template */
$link-color: darkorange;
$item-color: lightseagreen;
$bullet-color: darken($item-color, 8%);

a {
    color: $link-color;
}

li.title {
    color: $item-color;
    list-style: none;
    margin: 20px 0 0 0;
    font-size: 18px;
    font-weight: bold;
}

li.link {
    color: $bullet-color;
    list-style: square;
    font-weight: normal;
    font-size: 14px;
}
</style>
