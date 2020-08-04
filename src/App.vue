<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg" v-bind:class="(!['home'].includes($route.name))?'bg-primary':'fixed-top nav-down navbar-transparent'">
      <div class="container">
        <div class="navbar-translate">
          <a class="navbar-brand" href="javascript:;">Folded Map <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><title>split-vertical</title><g><rect x="6" y="22" fill="#A49E93" width="36" height="4"></rect> <path fill="#51bcda" d="M18,10h4v7c0,0.55228,0.44772,1,1,1h2c0.55228,0,1-0.44772,1-1v-7h4 c0.39062,0,0.74512-0.22754,0.90869-0.58203C30.97021,9.28418,31,9.1416,31,9c0-0.23438-0.08252-0.46582-0.24072-0.65039l-6-7 C24.56934,1.12793,24.29199,1,24,1s-0.56934,0.12793-0.75928,0.34961l-6,7c-0.25342,0.29492-0.31104,0.71289-0.14941,1.06836 C17.25488,9.77246,17.60938,10,18,10z"></path> <path fill="#51bcda" d="M30,38h-4v-7c0-0.55228-0.44772-1-1-1h-2c-0.55228,0-1,0.44772-1,1v7h-4 c-0.39062,0-0.74512,0.22754-0.90869,0.58203c-0.16162,0.35547-0.104,0.77344,0.14941,1.06836l6,7 C23.43066,46.87207,23.70801,47,24,47s0.56934-0.12793,0.75928-0.34961l6-7C30.91748,39.46582,31,39.23438,31,39 c0-0.1416-0.02979-0.28418-0.09131-0.41797C30.74512,38.22754,30.39062,38,30,38z"></path></g></svg></a>
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
                  <img v-if="getUserInfo().image_url" class="img-circle img-responsive img-no-padding" :src="getUserInfo().image_url" :alt="getUserInfo().image_url.display_name">
                  <img v-if="!getUserInfo().image_url" class="img-circle img-responsive img-no-padding" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
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
.img-circle .img-responsive .img-no-padding {
  object-fit: cover;
  width: 30px;
  height: 30px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {};
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserInfo: function () {
      return {
        id: localStorage.getItem("id"),
        image_url: localStorage.getItem("image_url"),
      };
    },
  },
};
</script>