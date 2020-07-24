<template>
  <div class="community-show">
    <h1>{{ block_pair.ns_max }} N/S | {{ block_pair.ew_max }} W</h1>
    <h1>Posts</h1>
    <div v-for="post in posts">
      <router-link class="nav-link" :to="`/users/${post.user_id}`"><img class="convo-prof" :src="post.user_image" :alt="post.user"></router-link>
      <h2><router-link class="nav-link" :to="`/users/${post.user_id}`">{{ post.user }}</router-link></h2>
      <small>{{ postedRelativeTime(post.created_at) }}<span v-if="post.user_id == current_user_id"> | Edit post | Delete post</span></small>
      <h3>{{ post.text }}</h3>
      <img v-if="post.image_url" class="post-pic" :src="post.image_url">
      <small>{{ post.comments.length }} comments</small>
      <div v-for="comment in post.comments">
        <router-link class="nav-link" :to="`/users/${comment.user_id}`"><img class="comment-prof" :src="comment.user_image" :alt="post.user"></router-link>
        <h4><router-link class="nav-link" :to="`/users/${comment.user_id}`">{{ comment.user }}</router-link></h4>
        <small>{{ postedRelativeTime(comment.created_at) }}<span v-if="comment.user_id == current_user_id"> | Edit comment | Delete comment</span></small>
        <h5>{{ comment.text }}</h5>
      </div>
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
      current_user_id: localStorage.getItem("user_id"),
    };
  },
  mounted: function () {
    axios.get(`/api/users/${this.current_user_id}`).then((response) => {
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
      return moment(date, "YYYYMMDD").fromNow();
    },
  },
};
</script>