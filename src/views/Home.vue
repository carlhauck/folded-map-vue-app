<template>
  <div class="home">
    
    <!-- Login modal -->
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header no-border-header text-center">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="emptyErrors()">
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
                <small class="form-text text-muted">{{ errors[0] }}</small>
              </div>
              <div v-if="!email || !password" class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-round disabled" disabled>Log In</button>
              </div>
              <div v-else class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-round">Log In</button>
              </div>
            </form>
            <div class="modal-footer no-border-footer">
              <p><span class="text-muted text-center"><a href="javascript:;">Forgot your password?</a></span></p>
              <p><span class="text-muted text-center">Don't have an account? <span v-on:click="closeModal()"><router-link to="/signup">Sign up</router-link></span>.</span></p>
            </div>
          </div>  
        </div>
      </div>
    </div>

    <!-- Landing page center text -->
    <div class="page-header" style="background-image: url('.././assets/img/bradknight-chicago.jpg')">
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

<style scoped>
.modal-footer {
  justify-content: center;
}
.disabled {
  z-index: -1;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
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
          this.closeModal();
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
    emptyErrors: function () {
      this.errors = [];
    },
    closeModal: function () {
      $("#loginModal").modal("toggle");
    },
  },
};
</script>
