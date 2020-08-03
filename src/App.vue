<template>
  <div id="app">
    <nav v-bind:class = "(!['home'].includes($route.name))?'navbar navbar-expand-lg bg-primary':'navbar navbar-expand-lg fixed-top nav-down navbar-transparent'">
      <div class="container">
        <div class="navbar-translate">
          <a class="navbar-brand" href="javascript:;">Folded Map</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link v-if="isLoggedIn()" class="nav-link" to="/community">Community</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn()" class="nav-link" to="/conversations">Conversations</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item dropdown">
              <a href="#" class="nav-link" data-toggle="dropdown" width="30" height="30" aria-expanded="false">
                <div class="profile-photo-small">
                  <img v-if="current_user.image_url" class="img-circle img-responsive img-no-padding" :src="current_user.image_url" :alt="current_user.display_name">
                  <img v-if="!current_user.image_url" class="img-circle img-responsive img-no-padding" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                </div>
              </a>
              <ul class="dropdown-menu dropdown-menu-right">
                <router-link class="dropdown-item" to="/profile">Profile</router-link>
                <router-link class="dropdown-item" to="/logout">Log Out</router-link>
              </ul>
            </li>
            <li class="nav-item">
              <a v-if="!isLoggedIn()" class="nav-link" data-toggle="modal" data-target="#loginModal" href="#">Log In</a>
            </li>
            <li class="nav-item">
              <router-link v-if="!isLoggedIn()" class="nav-link" to="/signup">Sign Up</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="['home', 'about', 'signup', 'users-edit'].includes($route.name)">
      <router-view/>
    </div>
    <div v-if="!['home', 'about', 'signup', 'users-edit'].includes($route.name)" class="main">
      <div class="container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>
nav {
  z-index: 2;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      current_user: {},
    };
  },
  created: function () {
    if (this.isLoggedIn()) {
      axios.get(`/api/users/${this.getUserId()}`).then((response) => {
        console.log(response.data);
        this.current_user = response.data;
      });
    }
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>