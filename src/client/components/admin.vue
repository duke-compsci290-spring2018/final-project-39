<template>
  <div>
      <form class="form">
        <input type="text" placeholder="Enter Username" v-model="user_name">
        <button type="button" class="btn btn-info" v-on:click="search">search</button>
      </form>

      <div v-if="searched">
      	<form>
      	<p>User Name: {{userInfo['username']}}</p>
      	<p>User Email: {{userInfo['email']}}</p>
      	<button type="button" class="btn btn-danger" v-on:click="delete_user">X</button>
        </form>
      </div>

      <Adminallevents v-bind:all_events="all_events"
                 v-on:deleteEvent="deleteEvent($event)"></Adminallevents>

  </div>
</template>

<script>
import { SERVER_URL } from './../assets/secrets.js';

import Bookedevents from './bookedEvents.vue'
import Adminallevents from './adminallEvents.vue'

export default {
  name: 'admin',

  data () {
    return {
    	user_name: "",
    	all_events: [],
    	searched: false,
    	userInfo: {
    		user_name: "",
    		email: "",
    		booked_events: [],
    		host_events: []
    	}
    }
  },

  components: {
        Adminallevents,
        Bookedevents
  },

  methods : {
  	search () {
  		console.log('call search');
  		this.userInfo['user_name'] = "";
  		this.userInfo['email'] = "";
        fetch(SERVER_URL + '/users/admin/' + this.user_name, { method: 'GET' })
                .then(response => response.json())
                //.then(res => console.log('hi james',res))
                .then(data => {
                    if(data === -1){
                    	alert("user not exist");
                        this.searched = false;
                        this.userInfo['user_name'] = "";
                        this.userInfo['email'] = "";}
                    else{
                	this.userInfo = data;
                	this.searched = true;
                    console.log(this.userInfo);}

                })
                .catch(error => console.log(error))
  	},

  	listEvents () {
        console.log('listEvents() called');
        fetch(SERVER_URL, { method: 'GET' }) // visit schema events to grab all events
            .then(response => response.json())
            .then(data => this.all_events = data)
            //.then(data => console.log(this.all_events))
            .catch(error => console.log(error))
        },

    delete_user(){
        console.log('delete_user called');
        fetch(SERVER_URL + '/users/admin/delete/'+ this.user_name, { method: 'GET' })
            .then(response => console.log(response))
            .catch(error => console.log(error))
        this.searched = false;
        },
    deleteEvent(event){
    	console.log('delete_event called');
    	fetch(SERVER_URL + '/admin_delete_event/', {
                method: 'POST',
                body: JSON.stringify(event),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(response => this.listEvents())
              .catch(error => console.log(error))
    }
  },
  mounted () {
        this.listEvents();
    }
}
</script>

<style lang="scss" scoped>

.logincss {
    background-color: lightyellow;
    color: Navy;
    font: 20px georgia;
    border: 3px outset DodgerBlue;
    border-radius: 5px;
    width: 80%;
    margin: auto;
    text-align: center;
}
</style>
