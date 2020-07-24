<template>
  <div class="users-show">
    <img :src="current_user.image_url" :alt="current_user.display_name">
    <h2>{{ current_user.display_name }}</h2>
    <p><strong>Age:</strong> {{ getAge(current_user.birthday) }}</p>
    <p><strong>Block:</strong> {{ current_user.block_ns }} {{ current_user.block_ew }}</p>
    <h4>How I came to live in my neighborhood:</h4>
    <p>{{ current_user.how_i_got_here }}</p>
    <h4>What I like about where I live:</h4>
    <p>{{ current_user.what_i_like }}</p>
    <h4>What I'd like to change about where I live:</h4>
    <p>{{ current_user.what_i_would_change }}</p>
    <router-link class="nav-link" :to="`/users/${current_user.id}/edit`">Edit Profile</router-link>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function () {
    return {
      current_user: {},
      current_user_id: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    axios.get(`/api/users/${this.current_user_id}`).then((response) => {
      this.current_user = response.data;
    });
  },
  methods: {
    getAge: function (date) {
      var years = moment().diff(date, "years");
      return years;
    },
  },
};
</script>