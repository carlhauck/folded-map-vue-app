<template>
  <div class="conversations-show">
    <img class="convo-prof" :src="conversation.partner.image_url" :alt="conversation.partner.display_name">
    <h3>Conversation w/ {{ conversation.partner.display_name }}</h3>
    <router-link class="nav-link" :to="`/users/${conversation.partner.id}`">See Profile</router-link>
    <div v-for="message in messages">
      <img class="convo-prof" :src="message.user_image" :alt="message.user">
      <p>{{ message.text }}</p>
      <p>{{ sentRelativeTime(message.created_at) }}</p>
    </div>
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
      conversation: {},
      messages: [],
    };
  },
  mounted: function () {},
  created: function () {
    axios
      .get(`/api/conversations/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.conversation = response.data;
        this.messages = response.data.messages;
      });
  },
  methods: {
    sentRelativeTime: function (date) {
      return moment(date, "YYYYMMDD").fromNow();
    },
  },
};
</script>