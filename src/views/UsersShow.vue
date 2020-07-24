<template>
  <div class="users-show">
    <img :src="user.image_url" :alt="user.display_name">
    <h2>{{ user.display_name }}</h2>
    <p><strong>Age:</strong> {{ getAge(user.birthday) }}</p>
    <p><strong>Block:</strong> {{ user.block_ns }} {{ user.block_ew }}</p>
    <h4>How I came to live in my neighborhood:</h4>
    <p>{{ user.how_i_got_here }}</p>
    <h4>What I like about where I live:</h4>
    <p>{{ user.what_i_like }}</p>
    <h4>What I'd like to change about where I live:</h4>
    <p>{{ user.what_i_would_change }}</p>
    <router-link v-if="user.id == current_user_id" class="nav-link" :to="`/users/${current_user_id}/edit`">Edit Profile</router-link>
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
      user: {},
      current_user_id: localStorage.getItem("user_id"),
    };
  },
  created: function () {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      this.user = response.data;
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