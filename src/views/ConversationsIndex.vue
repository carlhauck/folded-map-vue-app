<template>
  <div class="conversations-index">
    
    <div class="row" v-if="conversations.length > 0">
      <!-- Left column (conversations index) -->
      <div class="col-md-4 ml-auto mr-auto color-column">
        <div id="convos-container">
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
                <td class="final-td">
                  <div class="media-body">
                    <h5 class="media-heading">{{ conversation.partner.display_name }} <span v-if="conversation.map_twin === true"><svg style="padding-bottom: 9px;" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 48 48"><title>b-location</title><g stroke-linecap="square" stroke-linejoin="miter" stroke-width="3" fill="#51bcda" stroke="#51bcda"><path fill="none" stroke="#51bcda" stroke-miterlimit="10" d="M20,43.672 c0-1.208-0.529-2.357-1.476-3.108C17.078,39.416,14.57,38,11,38s-6.078,1.416-7.524,2.564C2.529,41.315,2,42.464,2,43.672V46h18 V43.672z"></path> <circle fill="none" stroke="#51bcda" stroke-miterlimit="10" cx="11" cy="28" r="5"></circle> <path fill="none" stroke="#51bcda" stroke-miterlimit="10" d="M46,43.672 c0-1.208-0.529-2.357-1.476-3.108C43.078,39.416,40.57,38,37,38s-6.078,1.416-7.524,2.564C28.529,41.315,28,42.464,28,43.672V46h18 V43.672z"></path> <circle fill="none" stroke="#51bcda" stroke-miterlimit="10" cx="37" cy="28" r="5"></circle> <path fill="none" stroke-miterlimit="10" d="M32,9.634 C32,14.366,24,22,24,22s-8-7.634-8-12.366C16,4.748,20.16,2,24,2S32,4.748,32,9.634z"></path> <circle data-stroke="none" cx="24" cy="10" r="2" stroke-linejoin="miter" stroke-linecap="square" stroke="none"></circle></g></svg></span></h5>
                    <div v-if="conversation.last_message">
                      <p class="text-muted truncate float-left"><small>{{ conversation.last_message.text }}</small></p>
                      <p class="text-muted float-right"><small> 𐄁 {{ sentTime(conversation.last_message.created_at) }}</small></p>
                    </div>
                    <div v-if="!conversation.last_message">
                      <p v-if="conversation.map_twin !== true" class="text-muted"><small><em>Start the conversation</em></small></p>
                      <p v-else class="text-muted"><small><em>Say hello to your Map Twin!</em></small></p>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
      <!-- Right column (conversation show) -->
      <div class="col-md-8 ml-auto mr-auto">
        <div id="#convo-partner-container">
          <div v-if="selectedConversation">
            <h4 class="text-center">Conversation w/ <router-link :to="`/users/${selectedConversation.partner.id}`">{{ selectedConversation.partner.display_name }}</router-link></h4>
          </div>
        </div>
        <div id="msgs-container">
          <div v-if="selectedConversation">
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
          </div>
        </div>
        <!-- New message form -->
        <div id="new-msg-container">
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

    <div v-else class="row justify-content-center">
      <div class="card card-profile card-plain">
        <div class="card-body">
          <div class="card-title">
            <h5 class="card-title text-muted no-convos">You haven't started any conversations yet.</h5>
            <router-link to="/community"><h5 class="card-title text-muted no-convos">Go be social.</h5></router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
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
.color-column {
  background-color: #fff8f1;
  border-right: 1px solid #fff1e6;
  border-left: 1px solid #fff1e6;
}
h4 {
  margin-top: 0.72em;
  margin-bottom: 0.55em;
}
h5 {
  line-height: 1.5em;
  margin-bottom: 0;
}
.media {
  margin-top: 15px;
  margin-bottom: 4px;
  padding-bottom: 5px;
  border-bottom: none;
}
.media .media-footer {
  margin-top: 5px;
}
.media-footer {
  margin-top: 5px;
}
.media-heading {
  display: block;
  white-space: nowrap;
}
.media-object {
  width: 64px;
  height: 64px;
  object-fit: cover;
}
p {
  margin-bottom: 0px;
}
p.text-muted {
  margin-bottom: 0px;
}
td {
  border-bottom: 1px solid lightgray;
}
td.final-td {
  width: 100%;
}
textarea {
  margin-right: 3px;
}
.truncate {
  white-space: nowrap;
  max-width: 226px;
  overflow: hidden;
  text-overflow: ellipsis;
}
#convos-container::-webkit-scrollbar {
  display: none;
}
#convos-container {
  margin: 0;
  max-height: 100vh;
  overflow-x: hidden;
}
#convo-partner-container {
  margin: 0;
  max-height: 10vh;
  overflow-x: hidden;
  position: sticky;
  top: 0;
}
#msgs-container {
  margin: 0;
  padding: 0 10px 10px 0px;
  max-height: 80vh;
  overflow-x: hidden;
}
#msgs-container::-webkit-scrollbar {
  display: none;
}
#msgs-container {
  margin: 0;
  max-height: 68vh;
  overflow-x: hidden;
}
#new-msg-container {
  max-height: 22vh;
  margin-top: 10px;
  margin-bottom: 1em;
  position: sticky;
  bottom: 0;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
import ActionCable from "actioncable";
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
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: (data) => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        var convoIndex = this.conversations.findIndex(
          (obj) => obj.id === this.selectedConversation.id
        );
        this.selectedConversation.messages.push(data); // update the messages in real time
        this.conversations[convoIndex].last_message.text = data.text; // update the last message in real time
      },
    });
  },
  mounted: function () {
    this.autoScroll(1200);
  },
  updated: function () {
    this.autoScroll(100);
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
      setTimeout(function updateScroll() {
        var element = document.getElementById("msgs-container");
        element.scrollTop = element.scrollHeight;
      }, 0);
    },
    autoScroll: function (num) {
      setTimeout(function () {
        var element = document.getElementById("msgs-container");
        element.scrollTop = element.scrollHeight;
      }, num);
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
          // this.conversations[convoIndex].messages.push(response.data);
          this.newMessage = "";
          setTimeout(function updateScroll() {
            var element = document.getElementById("msgs-container");
            element.scrollTop = element.scrollHeight;
          }, 0);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error);
        });
    },
  },
};
</script>