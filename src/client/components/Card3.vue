<template>
  <li>
    <div>
       <img src=imgtype/>
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
    <button type="button" class="btn btn-primary" style="width:80px; height:40px" v-on:click="editEvent">Edit</button>
    <button type="button" class="btn btn-primary" style="width:80px; height:40px" v-on:click="sendEmail">Email</button>
    <button type="button" class="btn btn-danger" style="width:80px; height:40px" v-on:click="deleteEvent">Delete</button>
  </li>
</template>

<script>
export default {
  name: 'Card3',
  props: ['event'],
  data: function () {
      return {
        ground: "MyCollapseC"+this.event['eid'],
        hash_ground: "#MyCollapseC"+this.event['eid'],
        imgtype : ""
      }
    },
  methods : {
    deleteEvent (){
      this.$emit('deleteEvent', this.event);
    },
    editEvent(){
      this.$emit('editEvent', this.event);
    },
    sendEmail(){
      this.$emit('sendEmail', this.event);
    }
  },

  created () {
   if (this.event.category === "Sports"){
    this.imgtype = "https://firebasestorage.googleapis.com/v0/b/mytrello-cc521.appspot.com/o/images%2Fsport.jpg?alt=media&token=d9788a43-c260-48d4-b2b9-93f094275aea";
   }
   else if(this.event.category === "Academic"){
    this.imgtype = "https://firebasestorage.googleapis.com/v0/b/mytrello-cc521.appspot.com/o/images%2FAcademic.jpg?alt=media&token=41ed3516-1fa4-4516-91d2-5373e00b0657";
   }
   else if(this.event.category === "Entertainment"){
    this.imgtype = "https://firebasestorage.googleapis.com/v0/b/mytrello-cc521.appspot.com/o/images%2FEntertainment.jpg?alt=media&token=7891dfd1-749a-4b46-b3b6-26fd578b4505";
   }
   else if(this.event.category === "Volunteer"){
    this.imgtype = "https://firebasestorage.googleapis.com/v0/b/mytrello-cc521.appspot.com/o/images%2Fvolunteer.jpg?alt=media&token=422efe78-6127-47fd-af8c-0a74e24b810d";
   }
   else if(this.event.category === "Careers"){
    this.imgtype = "https://firebasestorage.googleapis.com/v0/b/mytrello-cc521.appspot.com/o/images%2Fcareer.jpg?alt=media&token=1c71e2ee-cb7d-4d11-8d8e-ed125cfaf8e2";
   }
   else{this.imgtype = "https://firebasestorage.googleapis.com/v0/b/mytrello-cc521.appspot.com/o/images%2FAll.jpeg?alt=media&token=edf992d2-2ad2-434d-9fcb-7ad7bce64fed";}
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

