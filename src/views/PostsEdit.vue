<template>
  <div class="posts-edit">
    <h3>Edit post...</h3>
    <small>Originally posted {{ postedTime(post.created_at) }}</small>
    <form v-on:submit.prevent="updatePost(post)">
      <p><textarea v-model="post.text" placeholder="Type post here..." rows="5" cols="50"></textarea></p>
      <p><input type="text" size="50" v-model="post.image_url" placeholder="Paste image URL (optional)..."></p>
      <input type="submit" value="Update">
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
    };
  },
  mounted: function () {},
  created: function () {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.post = response.data;
    });
  },
  methods: {
    postedTime: function (date) {
      return moment(date).format("LLL");
    },
    updatePost: function (post) {
      var params = {
        text: post.text,
        image_url: post.image_url,
      };
      axios.patch(`api/posts/${post.id}`, params).then((response) => {
        this.$router.push(`/posts/${post.id}`);
      });
    },
  },
};
</script>