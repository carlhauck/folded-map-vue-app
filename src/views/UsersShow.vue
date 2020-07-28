<template>
  <div class="users-show">
    <div v-if="user.display_name">
      <img v-if="user.image_url" :src="user.image_url" :alt="user.display_name">
      <img v-if="!user.image_url" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
      <h2>{{ user.display_name }}</h2>
      <button v-if="user.id != $parent.getUserId()" v-on:click="createConversation()">Message {{ user.first_name }}</button>
      <p><strong>Joined:</strong> {{ joinedRelativeTime(user.created_at) }}</p>
      <p><strong>Age:</strong> {{ getAge(user.birthday) }}</p>
      <p><strong>Block:</strong> {{ user.block_ns }} {{ user.block_ew }}</p>
      <h4>How I came to live in my neighborhood:</h4>
      <p>{{ user.how_i_got_here }}</p>
      <h4>What I like about where I live:</h4>
      <p>{{ user.what_i_like }}</p>
      <h4>What I'd like to change about where I live:</h4>
      <p>{{ user.what_i_would_change }}</p>
      <router-link v-if="user.id == $parent.getUserId()" class="nav-link" :to="`/users/${user.id}/edit`">Edit Profile</router-link>
    </div>
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
      errors: [],
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
    joinedRelativeTime: function (date) {
      return moment.utc(date).fromNow();
    },
    createConversation: function () {
      var params = {
        recipient_id: this.user.id,
      };
      axios
        .post("/api/conversations", params)
        .then((response) => {
          console.log(response.data.id);
          this.$router.push(`/conversations/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>