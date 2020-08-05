<template>
  <div class="community-show">
    <div v-if="block_pair.ns_max">

      <!-- Modal: Create Post -->
      <div class="modal fade" id="createPostModal" tabindex="-1" role="dialog" aria-hidden="false">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header no-border-header text-center">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 class="modal-title text-center">Create post...</h3>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="createPost()">
                <div class="form-group">
                  <textarea class="form-control" v-model="newPost" placeholder="Type post here..." rows="12"></textarea>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newPostImageUrl" placeholder="Paste image URL (optional)...">
                </div>
                <div class="form-group text-center">
                  <button type="submit" class="btn btn-primary btn-round">Publish</button>
                </div>
              </form>
            </div>  
          </div>
        </div>
      </div>

      <!-- Modal: Update Post -->
      <div class="modal fade" id="updatePostModal" tabindex="-1" role="dialog" aria-hidden="false">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header no-border-header text-center">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h3 class="modal-title text-center">Edit post...</h3>
              <small>Originally posted {{ postedTime(post.created_at) }}</small>
            </div>
            <div class="modal-body">
              <form v-on:submit.prevent="updatePost()">
                <div class="form-group">
                  <textarea class="form-control" v-model="selectedPostText" placeholder="Type post here..." rows="12"></textarea>
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="selectedPostImageUrl" placeholder="Paste image URL (optional)...">
                </div>
                <div class="form-group text-center">
                  <button type="submit" class="btn btn-primary btn-round" data-target="#updatePostModal" data-toggle="modal">Update</button>
                </div>
              </form>
            </div>  
          </div>
        </div>
      </div>

      <!-- Modal: Show Map -->
      <div class="modal fade bd-example-modal-lg" id="showMapModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="container">
              <div id="map">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Left column -->
        <div class="col-md-4 ml-auto mr-auto text-center">
          <div id="block-container">
            <div class="container">
              <div class="card-title text-center">
                <a href="#" v-on:click="renderMap()" data-toggle="modal" data-target="#showMapModal">
                  <h3>{{ block_pair.ns_max }}<svg style="margin: 0 0 3 2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><title>increase</title><g stroke-width="1.3" fill="#111111" stroke="#66615b"><polygon fill="#eeeeee" stroke="#66615b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="3.5,5.5 8,0.5 12.5,5.5 "></polygon> <polygon fill="#eeeeee" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="3.5,10.5 8,15.5 12.5,10.5 "></polygon></g></svg> &nbsp;{{ block_pair.ew_max }}<svg style="margin: 0 0 3 -2" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><title>small-triangle-left</title><g stroke-width="1.1" fill="##eeeeee" stroke="#66615b"><polygon fill="#eeeeee" stroke="#66615b" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="10.5,3.5 5.5,8 10.5,12.5 "></polygon></g></svg></h3>
                </a>
              </div>
            </div>
          </div>
          <div id="users-container">
            <div class="container">
              <div class="row">
                <div v-for="user in users">
                  <div class="col-md-auto">
                    <router-link :to="`/users/${user.id}`">
                      <img v-if="user.image_url" class="img-fluid rounded cover" :src="user.image_url" :alt="user.display_name"><img v-if="!user.image_url" class="img-fluid rounded cover" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                    </router-link>
                    <p class="text-center pt-14"><router-link :to="`/users/${user.id}`">{{ user.display_name }}</router-link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="col-md-8 ml-auto mr-auto">
          <div id="new-post-container">
              <div id="new-post-button" class="text-center">
                <button type="button" style="width: 12%" class="btn btn-default btn-round btn-border" data-toggle="modal" data-target="#createPostModal"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><title>d-edit</title><g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" fill="#66615B" stroke="#66615B"><polyline points="9 5 2 5 2 22 19 22 19 15" fill="none" stroke="#66615B" stroke-miterlimit="10"></polyline> <line x1="16" y1="5" x2="19" y2="8" fill="none" stroke-miterlimit="10" stroke-linecap="butt"></line> <polygon points="11 16 7 17 8 13 19 2 22 5 11 16" fill="none" stroke-miterlimit="10"></polygon></g></svg></button>
              </div>
          </div>
          <div id="posts-container">
            <div class="media-area">
              <div v-for="post in posts">
                <div class="media">
                  <router-link class="pull-left" :to="`/users/${post.user_id}`">
                    <div class="avatar">
                      <img class="media-object" v-if="post.user_image" :src="post.user_image" :alt="post.user"><img class="media-object" v-if="!post.user_image" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                    </div>
                  </router-link>
                  <div class="media-body">
                    <router-link :to="`/users/${post.user_id}`"><h5 class="media-heading">{{ post.user }}</h5></router-link>
                    <div class="text-muted"><small>{{ postedRelativeTime(post.created_at) }}<span v-if="post.created_at != post.updated_at"> | Edited {{ postedRelativeTime(post.updated_at) }}</span></small></div>
                    <p>{{ post.text }}</p>
                    <div v-if="post.image_url"><img class="post-pic" :src="post.image_url">
                    </div>
                    <!-- Comments / Edit / Delete -->
                    <div class="media-footer">
                      <router-link class="btn btn-info btn-link" :to="`/posts/${post.id}`">{{ post.comments.length }} <span v-if="post.comments.length == 1">comment</span><span v-if="post.comments.length != 1">comments</span></router-link><span v-if="post.user_id == $parent.getUserInfo().id"><a href="#" class="btn btn-warning btn-link" v-on:click="sendInfo(post.id, post.text, post.image_url)" data-toggle="modal" data-target="#updatePostModal">Edit post</a><span class="btn btn-primary btn-link" v-on:click="destroyPost(post)">Delete post</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div id="map">
    </div> -->

  </div>
</template>

<style scoped>
#map {
  top: 0;
  bottom: 0;
  width: 100%;
  height: 650px;
}
.cover {
  object-fit: cover;
  width: 85px;
  height: 85px;
}
.media-area {
  margin-bottom: 4em;
}

.media .media-heading {
  margin-bottom: -4px;
}
.text-muted {
  margin-bottom: 8px;
}
.media .media-footer {
  margin-top: 12px;
}
.media {
  padding-bottom: 10px;
  margin-top: 20px;
}
.media .media {
  margin-top: 20px;
}

#block-container::-webkit-scrollbar {
  display: none;
}
#block-container {
  margin: 0;
  max-height: 18vh;
  overflow-x: hidden;
  position: sticky;
  top: 0;
}
#users-container::-webkit-scrollbar {
  display: none;
}
#users-container {
  margin: 0;
  max-height: 82vh;
  overflow-x: hidden;
}
#new-post-container::-webkit-scrollbar {
  display: none;
}
#new-post-container {
  margin: 0;
  max-height: 18vh;
  overflow-x: hidden;
  position: sticky;
  top: 0;
}
#posts-container::-webkit-scrollbar {
  display: none;
}
#posts-container {
  margin: 0;
  max-height: 82vh;
  overflow-x: hidden;
}
#new-post-button {
  margin-top: 22px;
  margin-bottom: 10px;
}
h3 {
  color: #66615b;
}
h3:hover {
  color: #514d49;
}
h3:hover svg g polygon {
  stroke: #514d49;
}
h5.media-heading {
  color: #66615b;
}
h5.media-heading:hover {
  color: #514d49;
}
p {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
img.post-pic {
  margin-top: 8px;
  max-width: 300px;
}
.pt-14 {
  font-size: 14px;
  padding-top: 2px;
  padding-bottom: 2px;
}
a {
  font-family: "silkamedium";
}
.btn.btn-default.btn-round.btn-border {
  background-color: transparent;
}
.btn.btn-default.btn-round.btn-border:hover {
  background-color: #ececec;
}
.btn.btn-default.btn-round.btn-border:hover svg g polygon {
  /* fill: #514d49; */
  stroke: #514d49;
}
.btn.btn-default.btn-round.btn-border:hover polyline {
  stroke: #514d49;
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
      post: {},
      users: [],
      newComment: "",
      newPost: "",
      newPostImageUrl: "",
      updatedComment: "",
      commentBeingUpdated: null,
      selectedPostId: "",
      selectedPostText: "",
      selectedPostImageUrl: "",
    };
  },
  created: function () {
    axios
      .get(`/api/users/${this.$parent.getUserInfo().id}`)
      .then((response) => {
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
  mounted: function () {},
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
    sendInfo(selectedPostId, selectedPostText, selectedPostImageUrl) {
      this.selectedPostId = selectedPostId;
      this.selectedPostText = selectedPostText;
      this.selectedPostImageUrl = selectedPostImageUrl;
    },
    postedTime: function (date) {
      return moment(date).format("LLL");
    },
    updatePost: function () {
      var postIndex = this.posts.findIndex(
        (obj) => obj.id === this.selectedPostId
      );
      var params = {
        text: this.selectedPostText,
        image_url: this.selectedPostImageUrl,
      };
      axios
        .patch(`api/posts/${this.selectedPostId}`, params)
        .then((response) => {
          this.posts[postIndex].text = this.selectedPostText;
          this.posts[postIndex].image_url = this.selectedPostImageUrl;
        });
    },
    renderMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/carlhauck/ckd6kfl3k01jn1iqnnxf5zcyu", // stylesheet location
        center: [-87.6598, 41.8781], // starting position [lng, lat]
        zoom: 11, // starting zoom
      });

      $("#showMapModal").on("shown.bs.modal", function () {
        map.resize();
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
                    [
                      this.block_pair.north_sw_lng,
                      this.block_pair.north_sw_lat,
                    ],
                    [
                      this.block_pair.north_se_lng,
                      this.block_pair.north_se_lat,
                    ],
                    [
                      this.block_pair.north_ne_lng,
                      this.block_pair.north_ne_lat,
                    ],
                    [
                      this.block_pair.north_nw_lng,
                      this.block_pair.north_nw_lat,
                    ],
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
                    [
                      this.block_pair.south_sw_lng,
                      this.block_pair.south_sw_lat,
                    ],
                    [
                      this.block_pair.south_se_lng,
                      this.block_pair.south_se_lat,
                    ],
                    [
                      this.block_pair.south_ne_lng,
                      this.block_pair.south_ne_lat,
                    ],
                    [
                      this.block_pair.south_nw_lng,
                      this.block_pair.south_nw_lat,
                    ],
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
  },
};
</script>