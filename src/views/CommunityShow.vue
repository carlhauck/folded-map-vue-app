<template>
  <div class="community-show">
    <h1>{{ block_pair.ns_max }} N/S | {{ block_pair.ew_max }} W</h1>

    <!-- <form v-on:submit.prevent="createPost()">
      <h3>Create post...</h3>
      <textarea v-model="newPost" placeholder="Type post here..." rows="10" cols="50"></textarea>
      <input type="text" v-model="newPostImageUrl"></input>
      <button v-on:click="createPost()">Publish</button>
    </form>
    
    <form v-on:submit.prevent="createComment(post)">
        <textarea v-model="newComment" :placeholder="`Comment on ${post.user_first_name}'s post...`" rows="3" cols="50"></textarea>
        <input type="submit" value="Send">
      </form> -->

    <h1>Posts</h1>
    <div v-for="post in posts">
      <router-link class="nav-link" :to="`/users/${post.user_id}`"><img class="convo-prof" :src="post.user_image" :alt="post.user"></router-link>
      <h2><router-link class="nav-link" :to="`/users/${post.user_id}`">{{ post.user }}</router-link></h2>
      <small>{{ postedRelativeTime(post.created_at) }}<span v-if="post.user_id == $parent.getUserId()"> | Edit post | Delete post</span></small>
      <h3>{{ post.text }}</h3>
      <p v-if="post.image_url"><img class="post-pic" :src="post.image_url"></p>
      <small>{{ post.comments.length }} comments</small>
      <div v-for="comment in post.comments">
        <router-link class="nav-link" :to="`/users/${comment.user_id}`"><img class="comment-prof" :src="comment.user_image" :alt="post.user"></router-link>
        <h4><router-link class="nav-link" :to="`/users/${comment.user_id}`">{{ comment.user }}</router-link></h4>
        <small>{{ postedRelativeTime(comment.created_at) }}<span v-if="comment.user_id == $parent.getUserId()"> | Edit comment | Delete comment</span></small>
        <h5>{{ comment.text }}</h5>
      </div>
      <form v-on:submit.prevent="createComment(post)">
        <textarea v-model="newComment" :placeholder="`Comment on ${post.user_first_name}'s post...`" rows="3" cols="50"></textarea>
        <input type="submit" value="Send">
      </form>
    </div>
    <h1>Members</h1>
    <!-- Add computed/method to show only OTHER users in block pair? -->
    <div v-for="user in users">
      <router-link class="nav-link" :to="`/users/${user.id}`"><img class="convo-prof" :src="user.image_url" :alt="user.display_name"></router-link>
      <h3><router-link class="nav-link" :to="`/users/${user.id}`">{{ user.display_name }}</router-link></h3>
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
img.comment-prof {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  object-fit: cover;
}
img.post-pic {
  width: 125px;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function () {
    return {
      current_user: {},
      block_pair: {},
      posts: [],
      users: [],
      newComment: "",
      newPost: "",
      newPostImageUrl: "",
    };
  },
  mounted: function () {
    axios.get(`/api/users/${this.$parent.getUserId()}`).then((response) => {
      this.current_user = response.data;
    });
  },
  created: function () {
    axios
      .get(`/api/block_pair/${this.current_user.block_pair_id}`)
      .then((response) => {
        console.log(response.data);
        this.block_pair = response.data;
        this.posts = response.data.posts;
        this.users = response.data.users;
      });
  },
  methods: {
    postedRelativeTime: function (date) {
      return moment.utc(date).fromNow();
    },
    showCreate: function () {
      document.querySelector("post-create").showModal();
    },
    createPost: function () {
      var params = {
        text: this.newPost,
        image_url: this.newPostImageUrl,
      };
      axios
        .post("/api/posts", params)
        .then((response) => {
          this.posts.push(response.data);
          this.newPost = "";
          this.newPostImageUrl = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error);
        });
    },
    createComment: function (post) {
      var postIndex = this.posts.findIndex((obj) => obj.id === post.id);
      var params = {
        post_id: post.id,
        text: this.newComment,
      };
      axios
        .post("/api/comments", params)
        .then((response) => {
          console.log(postIndex);
          this.posts[postIndex].comments.push(response.data);
          this.newComment = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error);
        });
    },
  },
};
</script>