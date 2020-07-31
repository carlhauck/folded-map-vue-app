<template>
  <div class="community-show">
    <div v-if="block_pair.ns_max">

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
        <div class="col-md-4 ml-auto mr-auto text-center">
          <div class="container">
            <div class="card-title text-center">
              <a href="javascript:;" v-on:click="renderMap()" data-toggle="modal" data-target="#showMapModal">
                <h3>{{ block_pair.ns_max }}<svg style="margin: 0 0 3 1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><title>increase</title><g stroke-width="1.5" fill="#111111" stroke="#333333"><polygon fill="#dddddd" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="3.5,5.5 8,0.5 12.5,5.5 "></polygon> <polygon fill="#dddddd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="3.5,10.5 8,15.5 12.5,10.5 "></polygon></g></svg> &nbsp;{{ block_pair.ew_max }}<svg style="margin: 0 0 3 -3" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><title>small-triangle-left</title><g stroke-width="1.3" fill="##dddddd" stroke="#333333"><polygon fill="#dddddd" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="10.5,3.5 5.5,8 10.5,12.5 "></polygon></g></svg></h3>
              </a>
            </div>
            <div class="row">
              <div v-for="user in users">
                <div class="col">
                  <a :href="`/users/${user.id}`">
                    <img v-if="user.image_url" class="img-fluid rounded" :src="user.image_url" :alt="user.display_name" width="85" height="85"><img v-if="!user.image_url" class="img-fluid" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar" width="85" height="85">
                  </a>
                  <p class="text-center text-muted"><router-link :to="`/users/${user.id}`">{{ user.display_name }}</router-link></p>
                </div>
              </div>
            </div>
            <div class="text-center">
              <h6 class="author">{{ block_pair.users.length }} members</h6>
            </div>
          </div>
        </div>
        <div class="col-md-8 ml-auto mr-auto">
          <div class="media-area">
            <div class="title text-center">
              <button type="button" style="width: 12%" class="btn btn-default btn-round btn-border" data-toggle="modal" data-target="#createPostModal"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><title>d-edit</title><g stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" fill="#66615B" stroke="#66615B"><polyline points="9 5 2 5 2 22 19 22 19 15" fill="none" stroke="#66615B" stroke-miterlimit="10"></polyline> <line x1="16" y1="5" x2="19" y2="8" fill="none" stroke-miterlimit="10" stroke-linecap="butt"></line> <polygon points="11 16 7 17 8 13 19 2 22 5 11 16" fill="none" stroke-miterlimit="10"></polygon></g></svg></button>
            </div>
            <div v-for="post in posts">
              <div class="media">
                <a class="pull-left" :href="`/users/${post.user_id}`">
                  <div class="avatar">
                    <img class="media-object" v-if="post.user_image" :src="post.user_image" :alt="post.user"><img class="media-object" v-if="!post.user_image" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                  </div>
                </a>
                <div class="media-body">
                  <a href="`/users/${post.user_id}`"><h5 class="media-heading">{{ post.user }}</h5></a>
                  <div class="text-muted"><small>{{ postedRelativeTime(post.created_at) }}<span v-if="post.created_at != post.updated_at"> | Edited {{ postedRelativeTime(post.updated_at) }}</span></small></div>
                  <p>{{ post.text }}</p>
                  <div v-if="post.image_url"><img class="post-pic" :src="post.image_url">
                  </div>
                  <div class="media-footer">
                    <router-link class="btn btn-primary btn-link" :to="`/posts/${post.id}`">{{ post.comments.length }} <span v-if="post.comments.length == 1">comment</span><span v-if="post.comments.length != 1">comments</span></router-link><span v-if="post.user_id == $parent.getUserId()"><router-link class="btn btn-default btn-link" :to="`/posts/${post.id}/edit`">Edit post</router-link><span class="btn btn-danger btn-link" v-on:click="destroyPost(post)">Delete post</span></span>
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