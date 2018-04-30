<template>
  <li>
    <div>
      <img src="https://firebasestorage.googleapis.com/v0/b/mytrello-cc521.appspot.com/o/images%2Fsport.jpg?alt=media&token=0a8c09cc-8b7b-4592-96d3-b3632650210f"/>
    </div>
    <span>
      <i>&mdash;</i>
        {{ event.time }}
      <i>&mdash;</i>
    </span>
    <span v-if="event.location !== 'None'">
      <i>&mdash;</i>
        {{ event.location }}
      <i>&mdash;</i>
    </span>
    <h3>
      <div
        v-html="event.title">
      </div>
    </h3>
    <div v-bind:id=ground class="collapse">
      <p>{{event.summary}}</p>
    </div>
    <button type="button" class="btn btn-info" 
    data-toggle="collapse" 
    v-bind:data-target=hash_ground style="width:80px; height:40px">Info</button>
    <button type="button" class="btn btn-danger" style="width:80px; height:40px" v-on:click="deleteEvent">Delete</button>
  </li>
</template>

<script>
export default {
  name: 'Card4',
  props: ['event'],
  data: function () {
      return {
        ground: "MyCollapseE"+this.event['eid'],
        hash_ground: "#MyCollapseE"+this.event['eid']
      }
    },
  methods : {
    deleteEvent (){
      this.$emit('deleteEvent', this.event);
    }
  }
}

</script>

<style scoped lang="scss">
  li {
    display: flex;
    flex-direction: column;
    background: #e6eeff;
    border: 3px solid darken(#e1f4f7, 8%);
    border-radius: 20px;
    padding: 2rem 1rem;
    text-align: center;
  }

  img {
    transition: box-shadow .15s ease-in-out;
    box-shadow: 0 0 0 2px #999999;
    width: 90%;

    &:hover {
      box-shadow: 0 0 0 2px #999999;
    }
  }

  span {
    font-size: 20px;
    color: #efb434;
    margin: 1rem 0 .5rem;
  }

  p {
    font-size: 15px;
    color: #efb434;
  }

  button {
    text-align: center;
    margin: 5% 40% 0% 40%;
  }

  h3 {
    margin: 0 .25rem 0 1rem;
  }
</style>

