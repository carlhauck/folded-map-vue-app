<template>
  <div class="conversations-index">
    <div v-for="conversation in conversations">
        <img class="convo-prof" :src="conversation.partner.image_url" :alt="conversation.partner.display_name">
        <h3>{{ conversation.partner.display_name }}</h3>
        <p>{{ conversation.last_message.text }}</p>
        <p>{{ sentRelativeTime(conversation.last_message.created_at) }}</p>
        <router-link class="nav-link" :to="`/conversations/${conversation.id}`">See Conversation</router-link>
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