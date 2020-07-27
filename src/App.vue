<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="isLoggedIn()" to="/conversations">Conversations</router-link> |
      <router-link v-if="isLoggedIn()" to="/community">Community</router-link> |
      <router-link v-if="isLoggedIn()" to="/profile">Profile</router-link> |
      <router-link v-if="!isLoggedIn()" to="/signup">Signup</router-link> |
      <router-link v-if="!isLoggedIn()" to="/login">Login</router-link> |
      <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
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
}
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