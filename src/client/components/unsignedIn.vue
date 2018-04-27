<template>
  <div>
    <nav class="navbar navbar-default">
          <div class="container-fluid">
                <div class=logincss>
                    <h3>Welcome!</h3>
                    <p>Please login in</p>
                    <form class="form">
                        <input type="text" placeholder="Enter Username" v-model="user_info">
                        <input type="text" placeholder="Enter Password" v-model="user_info">
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
                                          <input type="text" class="form-control"
                                              id="userPassword" placeholder="Enter New User Password" v-model="temp_email"/>
                                      </div>
                                      <div class="form-group">
                                        <label for="userEmail">Email</label>
                                          <input type="text" class="form-control"
                                              id="userEmail" placeholder="Enter New User Email" v-model="temp_email"/>
                                      </div>
                                      <button type="button" class="btn btn-info" data-dismiss="modal" v-on:click="modify_user">Create</button>
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
      msg: 'Welcome to main page'
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
