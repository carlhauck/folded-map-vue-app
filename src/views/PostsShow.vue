<template>
  <div class="posts-show">
      <router-link class="nav-link" :to="`/users/${post.user_id}`"><img class="convo-prof" :src="post.user_image" :alt="post.user"></router-link>
      <h2><router-link class="nav-link" :to="`/users/${post.user_id}`">{{ post.user }}</router-link></h2>
      <small>{{ postedRelativeTime(post.created_at) }}<span v-if="post.user_id == $parent.getUserId()"> | <router-link class="nav-link" :to="`/posts/${post.id}/edit`">Edit post</router-link> | <span v-on:click="destroyPost(post)">Delete post</span></span></small>
      <h3>{{ post.text }}</h3>
      <p v-if="post.image_url"><img class="post-pic" :src="post.image_url"></p>
      <small>{{ comments.length }} comments</small>
      <div v-for="comment in comments">
        <p><router-link class="nav-link" :to="`/users/${comment.user_id}`"><img class="comment-prof" :src="comment.user_image" :alt="post.user"></router-link></p>
        <h4><router-link class="nav-link" :to="`/users/${comment.user_id}`">{{ comment.user }}</router-link></h4>
        <h5 v-if="!(comment.id == commentBeingUpdated)">{{ comment.text }}</h5>
        <p v-if="!(comment.id == commentBeingUpdated)"><small>{{ postedRelativeTime(comment.created_at) }}<span v-if="comment.user_id == $parent.getUserId()"> | <span v-on:click="showCommentUpdate(comment)">Edit comment</span> | <span v-on:click="destroyComment(comment)">Delete comment</span></span></small></p>
        <form v-if="comment.id == commentBeingUpdated && updatedComment" v-on:submit.prevent="updateComment(comment)">
          <textarea v-model="updatedComment" rows="3" cols="50"></textarea>
          <input type="submit" value="Update">
        </form>
      </div>
      <form v-on:submit.prevent="createComment(post)">
        <textarea v-model="newComment" :placeholder="`Comment on ${post.user_first_name}'s post...`" rows="3" cols="50"></textarea>
        <input type="submit" value="Send">
      </form>
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
      post: {},
      comments: [],
      newComment: "",
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
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.post = response.data;
      this.comments = response.data.comments;
    });
  },
  methods: {
    postedRelativeTime: function (date) {
      return moment.utc(date).fromNow();
    },
    destroyPost: function (post) {
      if (confirm("Are you sure you want to delete this post?")) {
        axios.delete(`api/posts/${post.id}`).then((response) => {
          this.$router.push("/community");
        });
      }
    },
    createComment: function (post) {
      var params = {
        post_id: post.id,
        text: this.newComment,
      };
      axios
        .post("/api/comments", params)
        .then((response) => {
          this.comments.push(response.data);
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
    updateComment: function (comment) {
      var commentIndex = this.comments.findIndex(
        (obj) => obj.id === comment.id
      );
      var params = {
        id: comment.id,
        text: this.updatedComment,
      };
      axios.patch(`api/comments/${comment.id}`, params).then((response) => {
        this.comments[commentIndex].text = this.updatedComment;
        this.updatedComment = "";
        this.commentBeingUpdated = null;
      });
    },
    destroyComment: function (comment) {
      var commentIndex = this.comments.findIndex(
        (obj) => obj.id === comment.id
      );
      if (confirm("Are you sure you want to delete this comment?")) {
        axios.delete(`api/comments/${comment.id}`).then((response) => {
          this.comments.splice(commentIndex, 1);
        });
      }
    },
  },
};
</script>