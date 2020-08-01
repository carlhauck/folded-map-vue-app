<template>
  <div class="conversations-index">
    
    <div class="row">
      <div class="col-md-5 ml-auto mr-auto">
        <div class="table-responsive">
          <tbody>
            <tr v-on:click="selectConvo(conversation)" v-for="conversation in conversations">
              <td>
                <div class="media">
                  <div class="avatar">
                    <img class="media-object" v-if="conversation.partner.image_url" :src="conversation.partner.image_url" :alt="conversation.partner.display_name"><img class="media-object" v-if="!conversation.partner.image_url" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                  </div>
                </div>
              </td>
              <td>
                <div class="media-body">
                  <h5 class="media-heading">{{ conversation.partner.display_name }}</h5>
                  <p v-if="conversation.last_message" class="text-muted"><small>{{ conversation.last_message.text }} 𐄁 {{ sentTime(conversation.last_message.created_at) }}</small></p>
                  <p v-if="!conversation.last_message" class="text-muted"><small><em>Start the conversation</em></small></p>
                </div>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
      <div class="col-md-7 ml-auto mr-auto">
        <div v-if="selectedConversation">
          <img class="convo-prof" v-if="selectedConversation.partner.image_url" :src="selectedConversation.partner.image_url" :alt="selectedConversation.partner.display_name"><img class="convo-prof" v-if="!selectedConversation.partner.image_url" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
          <h3>Conversation w/ {{ selectedConversation.partner.display_name }}</h3>
          <p><router-link class="nav-link" :to="`/users/${selectedConversation.partner.id}`">See Profile</router-link></p>
          <div v-for="message in selectedConversation.messages">
            <img class="convo-prof" v-if="message.user_image" :src="message.user_image" :alt="message.user"><img class="convo-prof" v-if="!message.user_image" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
            <p>{{ message.text }}</p>
            <p>{{ sentRelativeTime(message.created_at) }}</p>
          </div>
          <form v-on:submit.prevent="createMessage()">
            <textarea v-model="newMessage" :placeholder="`Message ${selectedConversation.partner.first_name}...`" rows="3" cols="50"></textarea>
            <input type="submit" value="Send">
          </form>
        </div>
      </div>
    </div>

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
.media-heading {
  display: block;
  white-space: nowrap;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function () {
    return {
      conversations: [],
      selectedConversation: {},
    };
  },
  created: function () {
    axios.get("/api/conversations").then((response) => {
      this.conversations = response.data;
      this.selectedConversation = response.data[0];
    });
  },
  methods: {
    sentRelativeTime: function (date) {
      return moment.utc(date).fromNow();
    },
    sentTime: function (date) {
      return moment.utc(date).format("MMM D");
    },
    selectConvo: function (conversation) {
      this.selectedConversation = conversation;
      console.log(this.selectedConversation);
    },
  },
};
</script>