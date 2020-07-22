<template>
  <div class="users-edit">
    <form v-on:submit.prevent="updateUser()">
      <h1>Edit Profile</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>First name:</label>
        <input type="text" class="form-control" v-model="user.first_name">
      </div>
      <div class="form-group">
        <label>Last name:</label>
        <input type="text" class="form-control" v-model="user.last_name">
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email">
      </div>
      <div class="form-group">
        <label>Old password:</label>
        <input type="password" class="form-control" v-model="oldPassword">
      </div>
      <div class="form-group">
        <label>New password:</label>
        <input type="password" class="form-control" v-model="password">
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input type="password" class="form-control" v-model="passwordConfirmation">
        <small v-show="(password.length > 0) && (passwordConfirmation.length > 0) && (passwordConfirmation !== password)">Password doesn't match</small>
      </div>
      <div class="form-group">
        <label>Birthday:</label>
        <input type="text" class="form-control" v-model="user.birthday">
      </div>
      <div class="form-group">
        <label>House number:</label>
        <ValidationProvider v-slot="{ errors }">
          <input type="text" size="5" maxlength="5" class="form-control" v-model="user.street_num">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>Direction:</label>
        <input type="text" size="1" maxlength="1" class="form-control" v-model="user.street_direction">
      </div>
      <div class="form-group">
        <label>Street:</label>
        <input type="text" size="40" maxlength="50" class="form-control" v-model="user.street">
      </div>
      <div class="form-group">
        <label>ZIP Code:</label>
        <input type="text" size="5" maxlength="5" class="form-control" v-model="user.zip_code">
      </div>
      <div class="form-group">
        <label>Image URL:</label>
        <input type="text" class="form-control" v-model="user.image_url">
      </div>
      <div class="form-group">
        <label>How you came to live in your neighborhood:</label>
        <input type="text" class="form-control" v-model="user.how_i_got_here">
      </div>
      <div class="form-group">
        <label>What you like about where you live:</label>
        <input type="text" class="form-control" v-model="user.what_i_like">
      </div>
      <div class="form-group">
        <label>What you'd change about where you live:</label>
        <input type="text" class="form-control" v-model="user.what_i_would_change">
      </div>
      <input type="submit" class="btn btn-primary" value="Update">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ValidationProvider, extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

// extend("max", {
//   validate(value, args) {
//     return value.length <= args.length;
//   },
//   params: ["length"]
// });

export default {
  components: {
    ValidationProvider
  },
  data: function() {
    return {
      errors: [],
      user: {},
      oldPassword: "",
      password: "",
      passwordConfirmation: ""
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then(response => {
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function() {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        old_password: this.oldPassword,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        birthday: this.user.birthday,
        street_num: this.user.street_num,
        street_direction: this.user.street_direction,
        street: this.user.street,
        zip_code: this.user.zip_code,
        image_url: this.user.image_url,
        how_i_got_here: this.user.how_i_got_here,
        what_i_like: this.user.what_i_like,
        what_i_would_change: this.user.what_i_would_change
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then(response => {
          this.$router.push(`/users/${response.data.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>