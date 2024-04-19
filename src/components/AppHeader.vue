<template>
  <!-- navbar-->
  <header class="header bg-white">
    <div class="container px-lg-3">
      <nav class="navbar navbar-expand-lg navbar-light py-3 px-lg-0"><a class="navbar-brand" href="/"><span class="fw-bold text-uppercase text-dark">Apple Tree</span></a>
        <button class="navbar-toggler navbar-toggler-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <!-- <li class="nav-item">
              <router-link to="/" class="nav-link active">Home</router-link>
            </li> -->
            <li class="nav-item">
              <!-- <router-link to="/product" class="nav-link active">Shop</router-link> -->
            </li>
            <li>
              <router-link to="/members" class="nav-link active">Members</router-link>
            </li>
            <li>
              <router-link to="/products" class="nav-link active">Product</router-link>
            </li>
            <li>
              <router-link to="/orders" class="nav-link active">Orders</router-link>
            </li>
            <li>
            <router-link to="/statistics" class="nav-link active">Statistics</router-link>
            </li>
            <li>
            <router-link to="/feedback" class="nav-link active">Feedback</router-link>
            </li>

          </ul>
          <ul class="navbar-nav ms-auto">
            
            <router-link
              class="nav-link"
              to="/login"
              v-if="!isLoggedIn"
            >
            <li class="nav-item"> <i class="fas fa-user me-1 text-gray fw-normal"></i>Login</li></router-link>

            <template v-if="isLoggedIn" >
              <li class="nav-item" @click="logout"><a class="nav-link" href="#!"> <i class="fas fa-user me-1 text-gray fw-normal"></i>Logout</a></li>

            </template>
          </ul>
        </div>
      </nav>
    </div>
  </header>

</template>
<script>
import { useUserStore } from "@/stores/userStore";
import axios from "axios";

export default {
  methods: {
    logout() {
      console.log("logout");
      axios
          .get(`${this.API_URL}/user/logout`)
          .then((rs) => {
            const userStore = useUserStore();
            userStore.logout();
            this.$router.push("/");
          })
          .catch((error) => {
            console.log("登出失敗", error);
          });
    },
  },
  computed: {
    name() {
      const userStore = useUserStore();
      return userStore.userName;
    },
    id() {
      const userStore = useUserStore();
      return userStore.userId;
    },

    isLoggedIn() {
      return useUserStore().isLoggedIn;
    },
  },
};
</script>
<style scoped></style>
