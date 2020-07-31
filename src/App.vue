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
            <li class="nav-item dropdown">
              <router-link v-show="isLoggedIn()" class="nav-link navbar-brand" data-toggle="dropdown" width="30" height="30" aria-expanded="false" to="/profile">
                <div class="profile-photo-small">
                  <img v-show="current_user.image_url" class="img-circle img-responsive img-no-padding" :src="current_user.image_url" :alt="current_user.display_name">
                  <img v-show="!current_user.image_url" class="img-circle img-responsive img-no-padding" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                </div>
              </router-link>
              <ul class="dropdown-menu dropdown-menu-right">
                <a class="dropdown-item" href="/profile">Profile</a>
                <a class="dropdown-item" href="/logout">Log Out</a>
              </ul>
            </li>
            <li class="nav-item">
              <router-link v-if="!isLoggedIn()" class="nav-link" to="/signup">Sign Up</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!isLoggedIn()" class="nav-link" to="/login">Log In</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="['home'].includes($route.name)">
      <router-view/>
    </div>
    <div v-if="!['home'].includes($route.name)" class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

img.convo-prof {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
}
img.comment-prof {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
img.post-pic {
  width: 200px;
} */
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