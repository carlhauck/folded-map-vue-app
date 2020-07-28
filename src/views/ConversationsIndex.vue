<template>
  <div class="conversations-index">
    <div v-for="conversation in conversations">
        <img class="convo-prof" v-if="conversation.partner.image_url" :src="conversation.partner.image_url" :alt="conversation.partner.display_name"><img class="convo-prof" v-if="!conversation.partner.image_url" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
        <h3><router-link class="nav-link" :to="`/users/${conversation.partner.id}`">{{ conversation.partner.display_name }}</router-link> <span v-if="conversation.map_twin">– Map Twin</span></h3>
        <p v-if="conversation.last_message">{{ conversation.last_message.text }}</p>
        <p v-if="conversation.last_message"><small>{{ sentRelativeTime(conversation.last_message.created_at) }}</small></p>
        <p><router-link v-if="conversation.last_message" class="nav-link" :to="`/conversations/${conversation.id}`">See conversation</router-link>
        <router-link v-if="!conversation.last_message" class="nav-link" :to="`/conversations/${conversation.id}`">Start the conversation</router-link></p>
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
      conversations: [],
    };
  },
  created: function () {
    axios.get("/api/conversations").then((response) => {
      this.conversations = response.data;
    });
  },
  methods: {
    sentRelativeTime: function (date) {
      return moment.utc(date).fromNow();
    },
  },
};
</script>