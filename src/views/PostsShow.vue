<template>
  <div class="posts-show">
    
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
            <form v-on:submit.prevent="updatePost(post)">
              <div class="form-group">
                <textarea class="form-control" v-model="post.text" placeholder="Type post here..." rows="12"></textarea>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="post.image_url" placeholder="Paste image URL (optional)...">
              </div>
              <div class="form-group text-center">
                <button type="submit" class="btn btn-primary btn-round" data-target="#updatePostModal" data-toggle="modal">Update</button>
              </div>
            </form>
          </div>  
        </div>
      </div>
    </div>

    <div class="col-md-8 ml-auto mr-auto">
      <div class="media-area">
        <div class="media">
          <router-link class="pull-left" :to="`/users/${post.user_id}`">
            <div class="avatar">
              <img class="media-object" v-if="post.user_image" :src="post.user_image" :alt="post.user"><img class="media-object" v-if="!post.user_image" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
            </div>
          </router-link>
          <div class="media-body">
            <router-link :to="`/users/${post.user_id}`"><h5 class="media-heading">{{ post.user }}</h5></router-link>
            <div class="text-muted"><small>{{ postedRelativeTime(post.created_at) }}<span v-if="post.created_at != post.updated_at"> | Edited {{ postedRelativeTime(post.updated_at) }}</span></small>
            </div>
            <p>{{ post.text }}</p>
            <div v-if="post.image_url"><img class="post-pic" :src="post.image_url">
            </div>
            <div class="media-footer">
              <span class="btn btn-info btn-link">{{ post.comments.length }} <span v-if="post.comments.length == 1">comment</span><span v-if="post.comments.length != 1">comments</span></span><span v-if="post.user_id == $parent.getUserId()">
              <a href="javascript:;" class="btn btn-warning btn-link" data-toggle="modal" data-target="#updatePostModal">Edit post</a><span class="btn btn-primary btn-link" v-on:click="destroyPost(post)">Delete post</span></span>
            </div>

            <div v-for="comment in comments">
              <div class="media">
                <router-link class="pull-left" :to="`/users/${comment.user_id}`">
                  <div class="avatar">
                    <img class="media-object" v-if="comment.user_image" :src="comment.user_image" :alt="comment.user"><img class="media-object" v-if="!comment.user_image" src="https://icon-library.com/images/default-user-icon/default-user-icon-8.jpg" alt="default avatar">
                  </div>
                </router-link>
                <div class="media-body">
                  <router-link :to="`/users/${post.user_id}`"><h5 class="media-heading">{{ comment.user }}</h5></router-link>
                  <div v-if="!(comment.id == commentBeingUpdated)" class="text-muted"><small>{{ postedRelativeTime(comment.created_at) }}<span v-if="comment.created_at != comment.updated_at"> | Edited {{ postedRelativeTime(comment.updated_at) }}</span></small></div>
                  <p v-if="!(comment.id == commentBeingUpdated)">{{ comment.text }}</p>
                  <form v-if="comment.id == commentBeingUpdated && updatedComment" v-on:submit.prevent="updateComment(comment)">
                    <textarea class="form-control" v-model="updatedComment" rows="4"></textarea>
                    <input class="btn btn-round pull-right" type="submit" value="Update">
                  </form>
                  <div v-if="comment.image_url"><img class="post-pic" :src="comment.image_url">
                  </div>
                  <div class="media-footer">
                    <span v-if="comment.user_id == $parent.getUserId()"><span class="btn btn-warning btn-link" v-on:click="showCommentUpdate(comment)">Edit comment</span></router-link><span class="btn btn-primary btn-link" v-on:click="destroyComment(comment)">Delete comment</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="media media-post">
              <router-link class="pull-left author" to="/profile">
                <div class="avatar">
                  <img class="media-object" :src="current_user.image_url">
                </div>
              </router-link>
              <div class="media-body">
                <form v-on:submit.prevent="createComment(post)">
                  <textarea class="form-control" v-model="newComment" :placeholder="`Comment on ${post.user_first_name}'s post...`" rows="4"></textarea>
                  <div class="media-footer">
                    <input class="btn btn-round pull-right" type="submit" value="Leave comment">
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
  </div>
</template>

<style scoped>
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
  margin-top: 30px;
}
.media .media {
  margin-top: 20px;
}
p {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
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
  created: function () {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.post = response.data;
      this.comments = response.data.comments;
      axios.get(`/api/users/${this.$parent.getUserId()}`).then((response) => {
        this.current_user = response.data;
      });
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