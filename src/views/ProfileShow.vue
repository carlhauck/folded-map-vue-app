<template>

  <div class="users-show">

    <div class="row" v-if="current_user.display_name">
      <!-- Left column -->
      <div class="col-md-1 ml-auto mr-auto"></div>
      <div class="col-md-3 ml-auto mr-auto">
        <div class="card card-blog">
          <div class="card-image">
            <img v-if="current_user.image_url" :src="current_user.image_url" :alt="current_user.display_name">
            <img v-if="!current_user.image_url" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
          </div>
          <div class="card-body">
            <h3 class="card-title">{{ current_user.display_name }}</h3>
            <div class="card-description">
              <p><strong>Joined:</strong> {{ joinedRelativeTime(current_user.created_at) }}</p>
              <p><strong>Age:</strong> {{ getAge(current_user.birthday) }}</p>
              <p><strong>Block:</strong> {{ current_user.block_ns }} {{ current_user.block_ew }}</p>
            </div>
            <div class="card-footer">
              <button v-if="current_user.id != $parent.getUserInfo().id" class="btn btn-primary btn-round" v-on:click="createConversation()">Message {{ current_user.first_name }}</button>
            </div>
          </div>
        </div>    
      </div>
      <div class="col-md-7 ml-auto mr-auto">
        <div class="card card-profile card-plain text-left">
          <div class="card-body">
            <div class="card-description">
              <h5>How I came to live in my neighborhood:</h5>
              <p>{{ current_user.how_i_got_here }}</p>
              <h5>What I like about where I live:</h5>
              <p>{{ current_user.what_i_like }}</p>
              <h5>What I'd like to change about where I live:</h5>
              <p>{{ current_user.what_i_would_change }}</p>
              <router-link v-if="current_user.id == $parent.getUserInfo().id" class="btn btn-primary btn-round" :to="`/users/${current_user.id}/edit`">Edit Profile</router-link>
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
      current_user: {},
    };
  },
  created: function () {
    axios
      .get(`/api/users/${this.$parent.getUserInfo().id}`)
      .then((response) => {
        this.current_user = response.data;
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
  },
};
</script>