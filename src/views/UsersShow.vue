<template>
  <div class="users-show">
    
    <!-- Message modal -->
    <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-hidden="false">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header no-border-header text-center">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="emptyErrors()">
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 class="modal-title text-center">Message {{ user.first_name }}</h3>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="sendMessage()">
              <div class="form-group">
                <textarea class="form-control" v-model="newMessage" placeholder="Type message here..." rows="8"></textarea>
              </div>
              <div class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-round">Send</button>
              </div>
            </form>
          </div>  
        </div>
      </div>
    </div>

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
              <button v-if="user.id != $parent.getUserInfo().id" class="btn btn-primary btn-round" data-toggle="modal" data-target="#messageModal">Message {{ user.first_name }}</button>
            </div>
          </div>
        </div>    
      </div>
      <!-- Right column -->
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

<style scoped>
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
      newMessage: "",
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
    sendMessage: function () {
      var params = {
        recipient_id: this.user.id,
      };
      axios
        .post("/api/conversations", params)
        .then((response) => {
          console.log(response.data);
          var messageParams = {
            conversation_id: response.data.id,
            text: this.newMessage,
          };
          axios.post("api/messages", messageParams).then((response) => {
            $("#messageModal").modal("toggle");
            this.$router.push(`/conversations/`);
          });
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>