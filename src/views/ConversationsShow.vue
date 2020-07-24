<template>
  <div class="conversations-show">
    <img class="convo-prof" :src="partner.image_url" :alt="partner.display_name">
    <h3>Conversation w/ {{ partner.display_name }}</h3>
    <router-link class="nav-link" :to="`/users/${partner.id}`">See Profile</router-link>
    <div v-for="message in messages">
      <img class="convo-prof" :src="message.user_image" :alt="message.user">
      <p>{{ message.text }}</p>
      <p>{{ sentRelativeTime(message.created_at) }}</p>
    </div>
    <form v-on:submit.prevent="createMessage()">
      <textarea v-model="newMessage" :placeholder="`Message ${partner.first_name}...`" rows="3" cols="50"></textarea>
      <input type="submit" value="Send">
    </form>
  </div>
</template>

<style>
/* TEMPORARY */
img.convo-prof {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function () {
    return {
      errors: [],
      conversation: {},
      partner: {},
      messages: [],
      newMessage: "",
    };
  },
  mounted: function () {},
  created: function () {
    axios
      .get(`/api/conversations/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.conversation = response.data;
        this.partner = response.data.partner;
        this.messages = response.data.messages;
      });
  },
  methods: {
    sentRelativeTime: function (date) {
      return moment(date, "YYYYMMDD").fromNow();
    },
    createMessage: function () {
      var params = {
        conversation_id: this.conversation.id,
        text: this.newMessage,
      };
      axios
        .post("/api/conversations", params)
        .then((response) => {
          this.messages.push(response.data);
          this.newMessage = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error.response.data);
        });
    },
  },
};
</script>