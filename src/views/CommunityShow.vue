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
    <div style="width: 600px; height: 700px" id="mapContainer"></div>
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
  created: function () {
    axios.get(`/api/users/${this.$parent.getUserId()}`).then((response) => {
      this.current_user = response.data;
      axios
        .get(`/api/block_pair/${this.current_user.block_pair_id}`)
        .then((response) => {
          this.block_pair = response.data;
          this.posts = response.data.posts;
          this.users = response.data.users;
        });
    });
  },
  mounted: function () {
    // Initialize the platform object:
    var platform = new H.service.Platform({
      apikey: `${process.env.VUE_APP_HERE_API_KEY}`,
    });

    // Obtain the default map types from the platform object
    var defaultLayers = platform.createDefaultLayers();

    // Instantiate (and display) a map object:
    var map = new H.Map(
      document.getElementById("mapContainer"),
      defaultLayers.vector.normal.map,
      {
        zoom: 12.2,
        center: { lng: -87.6598, lat: 41.8781 },
      }
    );

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener("resize", () => map.getViewPort().resize());

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI:
    var ui = H.ui.UI.createDefault(map, defaultLayers, "en-US");
    var mapSettings = ui.getControl("mapsettings");
    var zoom = ui.getControl("zoom");
    var scalebar = ui.getControl("scalebar");
    zoom.setZoomSpeed("2");

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener("resize", () => map.getViewPort().resize());

    // Create a style object:
    var blockStyle = {
      strokeColor: "#435d6c",
      fillColor: "#aea8d3",
      lineWidth: 2,
      lineCap: "square",
      lineJoin: "miter",
    };

    // Create a rectangle and pass the custom style as an options parameter:
    var blockNorth = new H.map.Rect(
      new H.geo.Rect(41.92462, -87.71694, 41.93203, -87.7074),
      { style: blockStyle }
    );
    var blockSouth = new H.map.Rect(
      new H.geo.Rect(41.83017, -87.714365, 41.83723, -87.70482),
      { style: blockStyle }
    );

    // Add the rectangle to the map:
    map.addObject(blockNorth);
    map.addObject(blockSouth);

    var style = `
    sources:
        omv:
            type: OMV
            max_zoom: 17
            min_display_zoom: 1
    # global description of the map, in this example
    # the map background color is white
    scene:
        background:
            color: [1.000, 1.000, 1.000, 1.00]

    # section contains the style information for the layers
    # that are present on the map
    layers:
        # user defined name of the rendering layer
        water_areas:
            # the section defines where the rendering layer takes
            # its data from source: omv is mandatory for the Vector Tile API
            # layer: water specifies what vector layer is taken
            # for the rendering see REST API documentation for the
            # list of available layers.
            data: {source: omv, layer: water}
            # section defines how to render the layer
            draw:
                polygons:
                    order: 1 # z-order of the layer
                    color: "#435d6c"
        road:
            data: {source: omv, layer: roads}
            draw:
                lines:
                    order: 2
                    color: [0.561, 0.561, 0.561, 1.00]
                    width: 15
    `;

    var baseLayer = map.getBaseLayer();
    baseLayer.getProvider().setStyle(new H.map.Style(style));
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