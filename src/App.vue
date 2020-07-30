<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg bg-primary">
      <div class="container">
        <a class="navbar-brand" href="javascript:;">Folded Map</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn()" class="nav-link" to="/conversations">Conversations</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn()" class="nav-link" to="/community">Community</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn()" class="nav-link" to="/profile">Profile</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!isLoggedIn()" class="nav-link" to="/signup">Signup</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!isLoggedIn()" class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="isLoggedIn()" class="nav-link" to="/logout">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
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
export default {
  data: function () {
    return {};
  },
  created: function () {},
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