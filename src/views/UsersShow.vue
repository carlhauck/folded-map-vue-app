<template>
  <div class="users-show">
    <div class="row" v-if="user.display_name">
      <!-- Left column -->
      <div class="col-md-1 ml-auto mr-auto"></div>
      <div class="col-md-3 ml-auto mr-auto">
        <div class="card card-blog">
          <div class="card-image">
            <img v-if="user.image_url" :src="user.image_url" :alt="user.display_name">
            <img v-if="!user.image_url" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ user.display_name }}</h3>
            <div class="card-description">
              <p><strong>Joined:</strong> {{ joinedRelativeTime(user.created_at) }}</p>
              <p><strong>Age:</strong> {{ getAge(user.birthday) }}</p>
              <p><strong>Block:</strong> {{ user.block_ns }} {{ user.block_ew }}</p>
            </div>
            <div class="card-footer">
              <button v-if="user.id != $parent.getUserInfo().id" class="btn btn-primary btn-round" v-on:click="createConversation()">Message {{ user.first_name }}</button>
            </div>
          </div>
        </div>    
      </div>
      <div class="col-md-7 ml-auto mr-auto">
        <div class="card card-profile card-plain text-left">
          <div class="card-body">
            <div class="card-description">
              <h5>How I came to live in my neighborhood:</h5>
              <p>{{ user.how_i_got_here }}</p>
              <h5>What I like about where I live:</h5>
              <p>{{ user.what_i_like }}</p>
              <h5>What I'd like to change about where I live:</h5>
              <p>{{ user.what_i_would_change }}</p>
              <router-link v-if="user.id == $parent.getUserInfo().id" class="btn btn-primary btn-round" :to="`/users/${user.id}/edit`">Edit Profile</router-link>
            </div>            
          </div>
        </div>
      </div>
      <div class="col-md-1 ml-auto mr-auto"></div>
    </div>
  </div>
</template>

<style>
img {
  object-fit: cover;
  width: 100%;
}
.card .card-description {
  color: #66615b;
}
.card-profile p {
  margin-bottom: 2.5em;
}
.card.card-blog {
  margin-top: 3em;
}
.card.card-blog .card-body {
  background-color: #f1eae0;
}
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
          this.$router.push(`/conversations/`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>