<template>
  <div class="home">
    
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header no-border-header text-center">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 class="modal-title text-center">Log In</h3>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="attemptLogin()">
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" id="email" v-model="email">
              </div>
              <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" class="form-control" v-model="password">
              </div>
              <div class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-round" data-target="#loginModal" data-toggle="modal">Log In</button>
              </div>
              <div class="modal-footer no-border-footer">
                <p><span class="text-muted text-center"><a href="javascript:;">Forgot your password?</a></span></p>
                <p><span class="text-muted text-center">Don't have an account? <a href="javascript:;">Sign up</a>.</span></p>
            </div>
            </form>
          </div>  
        </div>
      </div>
    </div>

    <div class="page-header" style="background-image: url('https://images.unsplash.com/photo-1534299062258-32b234270bab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2602&q=80')">
      <div class="filter"></div>
      <div class="content-center">
        <div class="jumbotron jumbotron-fluid bg-transparent">
          <div class="container">
            <h1 class="landing-text">FOL</h1>
            <h1 class="landing-text fliph" style="margin-right: 22px;">DED</h1>
            <h1 class="landing-text" style="margin-left: 20px;">MAP</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  created: function () {},
  methods: {
    attemptLogin: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/community");
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
