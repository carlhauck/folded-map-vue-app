<template>
  <div class="users-edit">

    <!-- Password modal -->
    <div class="modal fade" id="passwordModal" tabindex="-1" role="dialog" aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header no-border-header text-center">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 class="modal-title text-center">Change Password</h3>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="updateUserNoRedirect()">
              <div class="form-group">
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <label>Old password:</label>
                  <input type="password" class="form-control"  id="oldPassword" v-model="oldPassword">
                  <small class="form-text text-muted">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <ValidationObserver>
                <div class="form-group">
                  <label>New password:</label>
                  <ValidationProvider v-slot="{ errors }" vid="confirmation">
                    <input type="password" class="form-control" v-model="password">
                    <small class="form-text text-muted">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label>Password confirmation:</label>
                  <ValidationProvider rules="confirmed:confirmation" v-slot="{ errors }">
                    <input type="password" class="form-control" v-model="passwordConfirmation">
                    <small class="form-text text-muted">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
              </ValidationObserver>
              <div v-if="!oldPassword || !password || !passwordConfirmation" class="form-group text-center">
                <button class="btn btn-primary btn-round disabled" disabled>Update</button>
              </div>
              <div v-else class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-round">Update</button>
              </div>
            </form>
          </div>  
        </div>
      </div>
    </div>

    <!-- User update form -->
    <div class="section section-gray">
      <div class="container container-tim">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <form v-on:submit.prevent="updateUser()">
              <h2 class="text-center">Edit Profile</h2>
              <!-- Update password button (toggles modal) -->
              <div class="form-group text-center">
                <button class="btn btn-warning btn-round btn-sm" type="button" data-toggle="modal" data-target="#passwordModal">Update password</button>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label>First name:</label>
                    <ValidationProvider name="First name" rules="required|alpha" v-slot="{ errors }">
                      <input type="text" class="form-control" v-model="user.first_name">
                      <small class="form-text text-muted">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                  <div class="col">
                    <label>Last name:</label>
                    <ValidationProvider name="Last name" rules="required|alpha" v-slot="{ errors }">
                      <input type="text" class="form-control" v-model="user.last_name">
                      <small class="form-text text-muted">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label>House number:</label>
                    <ValidationProvider name="House number" rules="required|numeric" v-slot="{ errors }">
                      <input type="text" maxlength="5" class="form-control" v-model="user.street_num">
                      <small class="form-text text-muted">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                  <div class="col">
                    <label for="direction">Street direction:</label>
                    <select id="direction" class="form-control" v-model="user.street_direction">
                      <option value="N">N</option>
                      <option value="S">S</option>
                      <option value="E">E</option>
                      <option value="W">W</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label>Street:</label>
                    <ValidationProvider name="Street" rules="required" v-slot="{ errors }">
                      <input type="text" maxlength="45" class="form-control" v-model="user.street">
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="col-md-2">
                    <label>ZIP code:</label>
                    <ValidationProvider name="ZIP code" rules="required|numeric" v-slot="{ errors }">
                      <input type="text" size="5" maxlength="5" class="form-control" v-model="user.zip_code">
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Email:</label>
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                  <input type="text" class="form-control" v-model="user.email">
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col-md-3">
                    <label>Birthday:</label>
                    <input type="date" class="form-control" v-model="user.birthday">
                  </div>
                  <div class="col-md-9">
                    <label>Image URL:</label>
                    <input type="text" class="form-control" v-model="user.image_url">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>How you came to live in your neighborhood:</label>
                <textarea class="form-control" id="howIGotHere" rows="3" v-model="user.how_i_got_here"></textarea>
              </div>
              <div class="form-group">
                <label>What you like about where you live:</label>
                <textarea class="form-control" id="whatILike" rows="3" v-model="user.what_i_like"></textarea>
              </div>
              <div class="form-group">
                <label>What you'd change about where you live:</label>
                <textarea class="form-control" id="WhatIWouldChange" rows="3" v-model="user.what_i_would_change"></textarea>
              </div>
              <!-- Update/destroy buttons -->
              <div class="form-group">
                <div class="row justify-content-center">
                  <div class="col-4 text-center">
                    <input type="submit" class="btn btn-info btn-round" value="Update Profile">
                  </div>
                  <div class="col-4 text-center">
                    <button class="btn btn-primary btn-round" type="button" v-on:click="destroyUser()">Delete Account</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 8px;
}
.section {
  padding-top: 0;
}
.disabled {
  z-index: -1;
}
</style>

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
    axios
      .get(`/api/users/${this.$parent.getUserInfo().id}`)
      .then((response) => {
        this.user = response.data;
      });
  },
  methods: {
    updateUser: function () {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
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
          localStorage.setItem("image_url", this.user.image_url);
          this.$router.push("/profile");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    updateUserNoRedirect: function () {
      var params = {
        old_password: this.oldPassword,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          $("#passwordModal").modal("toggle");
          this.oldPassword = "";
          this.password = "";
          this.passwordConfirmation = "";
          this.errors = [];
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