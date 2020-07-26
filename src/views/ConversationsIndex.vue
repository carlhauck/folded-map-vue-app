<template>
  <div class="conversations-index">
    <div v-for="conversation in conversations">
        <img class="convo-prof" :src="conversation.partner.image_url" :alt="conversation.partner.display_name">
        <h3><router-link class="nav-link" :to="`/users/${conversation.partner.id}`">{{ conversation.partner.display_name }}</router-link> <span v-if="conversation.map_twin">– Map Twin</span></h3>
        <p v-if="conversation.last_message">{{ conversation.last_message.text }}</p>
        <p v-if="conversation.last_message"><small>{{ sentRelativeTime(conversation.last_message.created_at) }}</small></p>
        <router-link v-if="conversation.last_message" class="nav-link" :to="`/conversations/${conversation.id}`">See conversation</router-link>
        <router-link v-if="!conversation.last_message" class="nav-link" :to="`/conversations/${conversation.id}`">Start the conversation</router-link>
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
  mounted: function () {},
  created: function () {
    axios.get("/api/conversations").then((response) => {
      console.log(response.data);
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