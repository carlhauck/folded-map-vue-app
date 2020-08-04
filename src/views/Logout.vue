<template>
  <div class="logout">
  </div>
</template>

<script>
import axios from "axios";

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    localStorage.removeItem("image_url");
    this.$router.push("/");
  },
};
</script>