<template>
  <div class="signup">
    <div class="section section-gray">
      <div class="container container-tim">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <form v-on:submit.prevent="submit()">
              <h2 class="text-center">Sign Up</h2>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label>First name:</label>
                    <ValidationProvider name="First name" rules="alpha" v-slot="{ errors }">
                      <input type="text" class="form-control" v-model="firstName">
                      <small class="form-text text-muted">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                  <div class="col">
                    <label>Last name:</label>
                    <ValidationProvider name="Last name" rules="alpha" v-slot="{ errors }">
                      <input type="text" class="form-control" v-model="lastName">
                      <small class="form-text text-muted">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label>House number:</label>
                    <ValidationProvider name="House number" rules="numeric" v-slot="{ errors }">
                      <input type="text" maxlength="5" class="form-control" v-model="streetNum">
                      <small class="form-text text-muted">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                  <div class="col">
                    <label for="direction">Street direction:</label>
                    <select id="direction" class="form-control" v-model="streetDirection">
                      <option value="N">N</option>
                      <option value="S">S</option>
                      <option value="E">E</option>
                      <option value="W">W</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="row">
                  <div class="col">
                    <label>Street:</label>
                    <input type="text" maxlength="45" class="form-control" v-model="street">
                  </div>
                  <div class="col">
                    <label>ZIP code:</label>
                    <ValidationProvider name="ZIP code" rules="numeric" v-slot="{ errors }">
                      <input type="text" size="5" maxlength="5" class="form-control" v-model="zipCode">
                      <small class="form-text text-muted">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Email:</label>
                <ValidationProvider name="email" rules="email" v-slot="{ errors }">
                  <input type="text" class="form-control" v-model="email">
                  <small class="form-text text-muted">{{ errors[0] }}</small>
                </ValidationProvider>
              </div>
              <ValidationObserver>
                <div class="form-group">
                  <label>Password:</label>
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
              <div class="form-check">
                <label class="form-check-label">
                  <input class="form-check-input" type="checkbox" v-model="checkbox" value="checked">
                  <span class="form-check-sign"></span>
                  I have read and agree to the <a href="javascript:;">Terms of Service</a>.
                </label>
              </div>
              <div v-if="!firstName || !lastName || !streetNum || !streetDirection || !street || !zipCode || !email || !password || !passwordConfirmation || !checkbox" class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-round disabled" disabled>Sign up</button>
              </div>
              <div v-else class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-round">Sign up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  padding-top: 0;
}
.disabled {
  z-index: -1;
}
</style>

<script>
import axios from "axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { email, numeric, alpha, confirmed } from "vee-validate/dist/rules";
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
      checkbox: "",
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