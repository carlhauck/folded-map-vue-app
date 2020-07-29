<template>
  <div class="community-show">
    <div v-if="block_pair.ns_max">
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
        <router-link class="nav-link" :to="`/users/${post.user_id}`"><img class="convo-prof" v-if="post.user_image" :src="post.user_image" :alt="post.user"><img class="convo-prof" v-if="!post.user_image" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar"></router-link>
        <h2><router-link class="nav-link" :to="`/users/${post.user_id}`">{{ post.user }}</router-link></h2>
        <small>{{ postedRelativeTime(post.created_at) }}<span v-if="post.created_at != post.updated_at"> | Edited {{ postedRelativeTime(post.updated_at) }}</span><span v-if="post.user_id == $parent.getUserId()"> | <router-link class="nav-link" :to="`/posts/${post.id}/edit`">Edit post</router-link> | <span v-on:click="destroyPost(post)">Delete post</span></span></small>
        <h3>{{ post.text }}</h3>
        <p v-if="post.image_url"><img class="post-pic" :src="post.image_url"></p>
        <p><small><router-link class="nav-link" :to="`/posts/${post.id}`">{{ post.comments.length }} <span v-if="post.comments.length == 1">comment</span><span v-if="post.comments.length != 1">comments</span></router-link></small></p>
      </div>
      <h1>Members</h1>
      <!-- Add computed/method to show only OTHER users in block pair? -->
      <div v-for="user in users">
        <router-link class="nav-link" :to="`/users/${user.id}`"><img class="convo-prof" v-if="user.image_url" :src="user.image_url" :alt="user.display_name"><img class="convo-prof" v-if="!user.image_url" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar"></router-link>
        <h3><router-link class="nav-link" :to="`/users/${user.id}`">{{ user.display_name }}</router-link></h3>
      </div>
    </div>
    <div id="map">
    </div>
    <!-- <div v-if="block_pair.north_ne_coord[0]" style="width: 600px; height: 700px" id="mapContainer"></div> -->
  </div>
</template>

<style>
#map {
  top: 0;
  bottom: 0;
  width: 100%;
  height: 600px;
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
      updatedComment: "",
      commentBeingUpdated: null,
    };
  },
  created: function () {
    axios.get(`/api/users/${this.$parent.getUserId()}`).then((response) => {
      this.current_user = response.data;
      axios
        .get(`/api/block_pair/${this.current_user.block_pair_id}`)
        .then((response) => {
          console.log(response.data);
          this.block_pair = response.data;
          this.posts = response.data.posts;
          this.users = response.data.users;
        });
    });
  },
  mounted: function () {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/carlhauck/ckd6kfl3k01jn1iqnnxf5zcyu", // stylesheet location
      center: [-87.6598, 41.8781], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    map.on(
      "load",
      function () {
        map.addSource("north", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [this.block_pair.north_sw_lng, this.block_pair.north_sw_lat],
                  [this.block_pair.north_se_lng, this.block_pair.north_se_lat],
                  [this.block_pair.north_ne_lng, this.block_pair.north_ne_lat],
                  [this.block_pair.north_nw_lng, this.block_pair.north_nw_lat],
                ],
              ],
            },
          },
        });
        map.addLayer({
          id: "north",
          type: "fill",
          source: "north",
          layout: {},
          paint: {
            "fill-color": "#088",
            "fill-opacity": 0.6,
          },
        });
      }.bind(this)
    );
    map.on(
      "load",
      function () {
        map.addSource("south", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Polygon",
              coordinates: [
                [
                  [this.block_pair.south_sw_lng, this.block_pair.south_sw_lat],
                  [this.block_pair.south_se_lng, this.block_pair.south_se_lat],
                  [this.block_pair.south_ne_lng, this.block_pair.south_ne_lat],
                  [this.block_pair.south_nw_lng, this.block_pair.south_nw_lat],
                ],
              ],
            },
          },
        });
        map.addLayer({
          id: "south",
          type: "fill",
          source: "south",
          layout: {},
          paint: {
            "fill-color": "#088",
            "fill-opacity": 0.6,
          },
        });
      }.bind(this)
    );
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