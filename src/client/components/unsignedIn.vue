<template>
  <div>
    <nav class="navbar navbar-default">
          <div class="container-fluid">
                <div class=logincss>
                    <h3>Welcome!</h3>
                    <p>Please login in</p>
                    <form class="form">
                        <input type="text" placeholder="Enter Username" v-model="user_name">
                        <input type="password" placeholder="Enter Password" v-model="user_password">
                        <button type="button" class="btn btn-info" v-on:click="user_login">Login</button>
                    </form>


                <p>Dont' have an account? Please Sign up
                <br>
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#fly">HERE</button> </p>
                    <div class="modal" id="fly">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body mb">
                                    <form role="form">
                                      <div class="form-group">
                                        <label for="userName">User Name</label>
                                          <input type="text" class="form-control"
                                          id="userName" placeholder="Enter New User Name" v-model="temp_name"/>
                                      </div>
                                      <div class="form-group">
                                        <label for="userPassword">Password</label>
                                          <input type="password" class="form-control"
                                              id="userPassword" placeholder="Enter New User Password" v-model="temp_password"/>
                                      </div>
                                      <div class="form-group">
                                        <label for="userEmail">Email</label>
                                          <input type="text" class="form-control"
                                              id="userEmail" placeholder="Enter New User Email" v-model="temp_email"/>
                                      </div>
                                      <button type="button" class="btn btn-info" data-dismiss="modal" v-on:click="signup">Create</button>
                                    </form>
                            </div>
                          </div>
                        </div>
                     </div>
                </div>
          </div>
        </nav>
  </div>

</template>

<script>
export default {
  name: 'unsignedIn',

  data () {
    return {
      user_name: "",
      user_password: "",
      temp_name: "",
      temp_password: "",
      temp_email: "",
      user_info: []
    }
  },

  methods : {
  	user_login () {
  		console.log('user_login called');
        fetch('http://localhost:3000/users/'+'search?name='+this.user_name+'&password='+this.user_password, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log("233333333333")
                console.log(data);
                this.$router.push({path: '/Signedin/' + data['uid']});
            })
            .catch(error => console.log(error))
        this.user_name = "";
        this.user_password = "";
  	},
    signup() {
        fetch(`http://localhost:3000/users/signup`, {
            method: 'POST',
            body: JSON.stringify({
                "new_username": this.temp_name,
                "new_password": this.temp_password,
                "new_email": this.temp_email
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
        .then(data => {
            if (data['is_user_exist'] === 0) {
                alert("Successfully signed up!");
            }
            else {
                alert("This username has been registered, please pick another one!");
            }
        })
        .catch(error => console.log(error))

        this.temp_name = "";
        this.temp_password = "";
        this.temp_email = "";
    }
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
