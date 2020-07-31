<template>
  <div class="home">
    
    <!-- <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-hidden="false">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header no-border-header text-center">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h3 class="modal-title text-center">Log In</h3>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="attemptLogin()">
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
    </div> -->

    <div class="page-header" style="background-image: url('https://images.unsplash.com/photo-1534299062258-32b234270bab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2602&q=80')">
      <div class="filter"></div>
      <div class="content-center">
        <div class="jumbotron jumbotron-fluid bg-transparent">
          <div class="container">
            <h1 class="landing-text">FOL</h1>
            <h1 class="landing-text fliph" style="margin-right: 22px;">DED</h1>
            <h1 class="landing-text" style="margin-left: 20px;">MAP</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  created: function () {},
  methods: {},
};
</script>
