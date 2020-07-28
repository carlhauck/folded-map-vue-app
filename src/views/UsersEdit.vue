<template>
  <div class="users-edit">
    <form v-on:submit.prevent="updateUser()">
      <h1>Edit Profile</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>First name:</label>
        <ValidationProvider name="First name" rules="alpha" v-slot="{ errors }">
          <input type="text" class="form-control" v-model="user.first_name">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>Last name:</label>
        <ValidationProvider name="Last name" rules="alpha" v-slot="{ errors }">
          <input type="text" class="form-control" v-model="user.last_name">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>House number:</label>
        <ValidationProvider name="House number" rules="numeric" v-slot="{ errors }">
          <input type="text" size="5" maxlength="5" class="form-control" v-model="user.street_num">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>Street direction:</label>
        <select name="direction" id="direction" v-model="user.street_direction">
          <option value="N">N</option>
          <option value="S">S</option>
          <option value="E">E</option>
          <option value="W">W</option>
        </select>
       </div>
      <div class="form-group">
        <label>Street:</label>
        <input type="text" maxlength="45" class="form-control" v-model="user.street">
      </div>
      <div class="form-group">
        <label>ZIP code:</label>
        <ValidationProvider name="ZIP code" rules="numeric" v-slot="{ errors }">
          <input type="text" size="5" maxlength="5" class="form-control" v-model="user.zip_code">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <input type="text" class="form-control" v-model="user.email">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>Old password:</label>
        <input type="password" class="form-control" v-model="oldPassword">
      </div>
      <ValidationObserver>
        <div class="form-group">
          <label>New password:</label>
          <ValidationProvider v-slot="{ errors }" vid="confirmation">
            <input type="password" class="form-control" v-model="password">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <ValidationProvider rules="confirmed:confirmation" v-slot="{ errors }">
            <input type="password" class="form-control" v-model="passwordConfirmation">
            <span>{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
      </ValidationObserver>
      <div class="form-group">
        <label>Birthday:</label>
        <input type="date" class="form-control" v-model="user.birthday">
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
      <input type="submit" class="btn btn-primary" value="Update Profile">
    </form>
    <button v-on:click="destroyUser()">Delete Account</button>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import {
  required,
  email,
  numeric,
  alpha,
  confirmed,
} from "vee-validate/dist/rules";
import { extend } from "vee-validate";
extend("email", {
  ...email,
  message: "Invalid email",
});
extend("alpha", {
  ...alpha,
  message: "Field may only contain alphabetic characters",
});
extend("numeric", {
  ...numeric,
  message: "Field may only contain numeric characters",
});
extend("confirmed", {
  ...confirmed,
  message: "Password confirmation must match password",
});
extend("required", {
  ...required,
  message: "This field is required",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: function () {
    return {
      errors: [],
      user: {},
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  created: function () {
    axios.get(`/api/users/${this.$parent.getUserId()}`).then((response) => {
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function () {
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
        what_i_would_change: this.user.what_i_would_change,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push("/profile");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function () {
      if (
        confirm(
          "Are you sure you want to delete your account? This cannot be undone."
        )
      ) {
        axios.delete(`api/users/${this.user.id}`).then((response) => {
          this.$router.push("/");
        });
      }
    },
  },
};
</script>