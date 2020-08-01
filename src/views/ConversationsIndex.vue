<template>
  <div class="conversations-index">
    
    <div class="row">
      <!-- Left column (conversations index) -->
      <div class="col-md-4 ml-auto mr-auto color-column-2">
        <div class="table-responsive">
          <tbody>
            <tr v-on:click="selectConvo(conversation)" v-for="conversation in conversations">
              <!-- Profile image -->
              <td>
                <div class="media">
                  <div class="avatar">
                    <img class="media-object" v-if="conversation.partner.image_url" :src="conversation.partner.image_url" :alt="conversation.partner.display_name"><img class="media-object" v-if="!conversation.partner.image_url" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                  </div>
                </div>
              </td>
              <!-- Most recent message (truncated content & datestamp) -->
              <td>
                <div class="media-body">
                  <h5 class="media-heading">{{ conversation.partner.display_name }}</h5>
                  <div v-if="conversation.last_message">
                    <p class="text-muted truncate float-left"><small>{{ conversation.last_message.text }}</small></p>
                    <p class="text-muted float-right"><small> 𐄁 {{ sentTime(conversation.last_message.created_at) }}</small></p>
                  </div>
                  <div v-if="!conversation.last_message">
                    <p class="text-muted"><small><em>Start the conversation</em></small></p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
      <!-- Right column (conversation show) -->
      <div class="col-md-8 ml-auto mr-auto">
        <div v-if="selectedConversation">
          <h4 class="text-center">Conversation w/ <router-link :to="`/users/${selectedConversation.partner.id}`">{{ selectedConversation.partner.display_name }}</router-link></h4>
          <div v-for="message in selectedConversation.messages">
            <!-- Conversation partner messages -->
            <div v-if="message.user_id != $parent.getUserId()" class="row justify-content-start">
              <div class="col-md-8">
                <div class="media">
                  <div class="avatar">
                    <img class="media-object" v-if="message.user_image" :src="message.user_image" :alt="message.user_image"><img class="media-object" v-if="!message.user_image" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                  </div>
                  <div class="media-body">
                    <div class="card">
                      <div class="card-body card-partner">
                        <p>{{ message.text }}</p>
                      </div>
                    </div>
                    <div class="media-footer">
                      <p class="text-muted"><small>{{ sentRelativeTime(message.created_at) }}</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Current user messages -->
            <div v-if="message.user_id == $parent.getUserId()" class="row justify-content-end">
              <div class="col-md-8">
                <div class="media">
                  <div class="media-body">
                    <div class="card">
                      <div class="card-body card-self">
                        <p>{{ message.text }}</p>
                      </div>
                    </div>
                    <div class="media-footer">
                      <p class="text-muted pull-right"><small>{{ sentRelativeTime(message.created_at) }}</small></p>
                    </div>
                  </div>
                  <div class="avatar-current-user">
                    <img class="media-object" v-if="message.user_image" :src="message.user_image" :alt="message.user_image"><img class="media-object" v-if="!message.user_image" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- New message form -->
          <div class="row justify-content-center">
            <form class="form-inline" v-on:submit.prevent="createMessage()">
              <div class="form-group">
                <textarea class="form-control" v-model="newMessage" :placeholder="`Message ${selectedConversation.partner.first_name}...`" rows="3" cols="75"></textarea>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-round btn-neutral btn-sm"><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48"><title>ic_send_48px</title><g fill="#66615B"><path d="M4.02 42L46 24 4.02 6 4 20l30 4-30 4z"></path></g></svg></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.media-heading {
  display: block;
  white-space: nowrap;
}
.card {
  margin-bottom: 0px;
  border-radius: 15px;
}
.card-partner {
  background-color: lightgray;
  border-radius: 15px;
}
.card-self {
  background-color: #665b78;
  border-radius: 15px;
  color: #ffffff;
}
.avatar-current-user {
  margin: 0 auto;
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
  margin-left: 15px;
  margin-right: 0px;
  border: 3px solid #ffffff;
}
.form-inline {
  margin-top: 20px;
  margin-bottom: 2em;
}
.media {
  margin-top: 17px;
  padding-bottom: 5px;
  border-bottom: none;
}
.media-object {
  width: 64px;
  height: 64px;
  object-fit: cover;
}
.media-footer {
  margin-top: 5px;
}
p {
  margin-bottom: 0px;
}
p.text-muted {
  margin-bottom: 0px;
}
textarea {
  margin-right: 5px;
}
.truncate {
  white-space: nowrap;
  max-width: 225px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.color-column {
  background-color: #fff5ec;
  border-right: 1px solid #ffeee0;
  border-left: 1px solid #ffeee0;
}
.color-column-2 {
  background-color: #fcfbfa;
  /* border-right: 1px solid #ffeee0;
  border-left: 1px solid #ffeee0; */
}
h5 {
  line-height: 1.5em;
  margin-bottom: 0;
}
h4 {
  margin-bottom: 0.75em;
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
      newMessage: "",
    };
  },
  created: function () {
    axios.get("/api/conversations").then((response) => {
      this.conversations = response.data;
      this.selectedConversation = response.data[0];
      console.log(response.data[0]);
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
    createMessage: function () {
      var convoIndex = this.conversations.findIndex(
        (obj) => obj.id === this.selectedConversation.id
      );
      var params = {
        conversation_id: this.selectedConversation.id,
        text: this.newMessage,
      };
      axios
        .post("/api/messages", params)
        .then((response) => {
          this.conversations[convoIndex].messages.push(response.data);
          this.newMessage = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error);
        });
    },
  },
};
</script>