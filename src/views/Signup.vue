<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>First name:</label>
        <ValidationProvider name="First name" rules="alpha" v-slot="{ errors }">
          <input type="text" class="form-control" v-model="firstName">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>Last name:</label>
        <ValidationProvider name="Last name" rules="alpha" v-slot="{ errors }">
          <input type="text" class="form-control" v-model="lastName">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>House number:</label>
        <ValidationProvider name="House number" rules="numeric" v-slot="{ errors }">
          <input type="text" size="5" maxlength="5" class="form-control" v-model="streetNum">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>Street direction:</label>
        <select name="direction" id="direction" v-model="streetDirection">
          <option value="N">N</option>
          <option value="S">S</option>
          <option value="E">E</option>
          <option value="W">W</option>
        </select>
       </div>
      <div class="form-group">
        <label>Street:</label>
        <input type="text" maxlength="45" class="form-control" v-model="street">
      </div>
      <div class="form-group">
        <label>ZIP code:</label>
        <ValidationProvider name="ZIP code" rules="numeric" v-slot="{ errors }">
          <input type="text" size="5" maxlength="5" class="form-control" v-model="zipCode">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <input type="text" class="form-control" v-model="email">
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <ValidationObserver>
        <div class="form-group">
          <label>Password:</label>
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
      <input type="submit" class="btn btn-primary" value="Submit">
    </form>
  </div>
</template>

<script>
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
      firstName: "",
      lastName: "",
      streetNum: "",
      streetDirection: "",
      street: "",
      zipCode: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      var params = {
        first_name: this.firstName,
        last_name: this.lastName,
        street_num: this.streetNum,
        street_direction: this.streetDirection,
        street: this.street,
        zip_code: this.zipCode,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>