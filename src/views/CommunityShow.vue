<template>
  <div class="community-show">
    <h1>{{ block_pair.ns_max }} N/S | {{ block_pair.ew_max }} W</h1>

    <form v-on:submit.prevent="createPost()">
      <!-- Will eventually put this into a modal -->
      <h3>Create post...</h3>
      <p><textarea v-model="newPost" placeholder="Type post here..." rows="5" cols="50"></textarea></p>
      <p><input type="text" size="50" v-model="newPostImageUrl" placeholder="Paste image URL (optional)..."></p>
      <input type="submit" value="Publish">
    </form>

    <h1>Posts</h1>
    <div v-for="post in posts">
      <router-link class="nav-link" :to="`/users/${post.user_id}`"><img class="convo-prof" :src="post.user_image" :alt="post.user"></router-link>
      <h2><router-link class="nav-link" :to="`/users/${post.user_id}`">{{ post.user }}</router-link></h2>
      <small>{{ postedRelativeTime(post.created_at) }}<span v-if="post.user_id == $parent.getUserId()"> | <router-link class="nav-link" :to="`/posts/${post.id}/edit`">Edit post</router-link> | <span v-on:click="destroyPost(post)">Delete post</span></span></small>
      <h3>{{ post.text }}</h3>
      <p v-if="post.image_url"><img class="post-pic" :src="post.image_url"></p>
      <small><router-link class="nav-link" :to="`/posts/${post.id}`">{{ post.comments.length }} comments</router-link></small>
      <div v-for="comment in post.comments">
        <p><router-link class="nav-link" :to="`/users/${comment.user_id}`"><img class="comment-prof" :src="comment.user_image" :alt="post.user"></router-link></p>
        <h4><router-link class="nav-link" :to="`/users/${comment.user_id}`">{{ comment.user }}</router-link></h4>
        <h5 v-if="!(comment.id == commentBeingUpdated)">{{ comment.text }}</h5>
        <p v-if="!(comment.id == commentBeingUpdated)"><small>{{ postedRelativeTime(comment.created_at) }}<span v-if="comment.user_id == $parent.getUserId()"> | <span v-on:click="showCommentUpdate(comment)">Edit comment</span> | <span v-on:click="destroyComment(post, comment)">Delete comment</span></span></small></p>
        <form v-if="comment.id == commentBeingUpdated && updatedComment" v-on:submit.prevent="updateComment(post, comment)">
          <textarea v-model="updatedComment" rows="3" cols="50"></textarea>
          <input type="submit" value="Update">
        </form>
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
      updatedComment: "",
      commentBeingUpdated: null,
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
    destroyPost: function (post) {
      var postIndex = this.posts.findIndex((obj) => obj.id === post.id);
      if (confirm("Are you sure you want to delete this post?")) {
        axios.delete(`api/posts/${post.id}`).then((response) => {
          this.posts.splice(postIndex, 1);
        });
      }
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
          this.posts[postIndex].comments.push(response.data);
          this.newComment = "";
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(error);
        });
    },
    showCommentUpdate: function (comment) {
      this.updatedComment = comment.text;
      this.commentBeingUpdated = comment.id;
    },
    updateComment: function (post, comment) {
      var postIndex = this.posts.findIndex((obj) => obj.id === post.id);
      var commentIndex = this.posts[postIndex].comments.findIndex(
        (obj) => obj.id === comment.id
      );
      var params = {
        id: comment.id,
        text: this.updatedComment,
      };
      axios.patch(`api/comments/${comment.id}`, params).then((response) => {
        this.posts[postIndex].comments[commentIndex].text = this.updatedComment;
        this.updatedComment = "";
        this.commentBeingUpdated = null;
      });
    },
    destroyComment: function (post, comment) {
      var postIndex = this.posts.findIndex((obj) => obj.id === post.id);
      var commentIndex = this.posts[postIndex].comments.findIndex(
        (obj) => obj.id === comment.id
      );
      if (confirm("Are you sure you want to delete this comment?")) {
        axios.delete(`api/comments/${comment.id}`).then((response) => {
          this.posts[postIndex].comments.splice(commentIndex, 1);
        });
      }
    },
  },
};
</script>