<template>
  <link
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"
      rel="stylesheet"
  />
  <main class="container col-xl-10 col-xxl-8 px-4 py-5">
    <div class="row align-items-center g-lg-5 py-5">
      <div class="col-lg-7 text-center text-lg-start">
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="@/assets/img/iphone.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="@/assets/img/macbook2.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="@/assets/img/ipad.jpg" class="d-block w-100" alt="...">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-md-10 mx-auto col-lg-5">
        <form class="p-4 p-md-5 border rounded-3 bg-light">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="name@example.com"
              v-model="email"
            />
            <label>Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              v-model="password"
            />
            <label>Password</label>
          </div>
          <div class="row mb-4">
            <div class="col">
              <!-- Simple link -->
              <a href="/forget">Forgot password?</a>
            </div>
          </div>
          <button class="w-100 btn btn-lg btn-primary" @click.prevent="login">
            SIGN IN
          </button>
          <div class="text-danger text-center mt-3">{{ message }}</div>

          <hr class="my-4" />
          <div class="text-center">
            <p>Not a member? <a href="/register">Register</a></p>
            <p>or sign up with:</p>

            <button
              type="button"
              class="btn btn-link btn-floating mx-1"
              @click.prevent="gotoGoogleLoginPage"
            >
              <i class="fab fa-google"></i>
            </button>
            <button type="button" class="btn btn-link btn-floating mx-1" @click.prevent="gotoLineLoginPage">
              <i class="fab fa-line"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
<!--  modal-->
    <div class="modal fade" id="blockedAccountModal" tabindex="-1" aria-labelledby="blockedAccountModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-warning text-black"> <!-- 更改背景颜色和标题颜色 -->
            <h5 class="modal-title" id="blockedAccountModalLabel">警告！</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            此帳號已遭停權！<br>如有疑問，可透過Facebook或Line聯繫我們。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  <button class="fixed-button" @click="toggleButtons">
    <i :class="iconClass"></i>
  </button>

  <!-- 彈出的按鈕列表 -->
  <transition name="slide">
    <div v-if="isButtonsVisible" class="buttons-container">
      <button class="sub-button">
        <a href="https://m.me/61558057817825" target="_blank">
          <i class="fab fa-facebook-messenger"></i>
        </a>
      </button>
      <button class="sub-button">
        <a
            href="https://page.line.me/003cdcek?openQrModal=true"
            target="_blank"
        ><i class="bi bi-line"></i
        ></a>
      </button>
      <button class="sub-button"><i class="fab fa-whatsapp"></i></button>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import { useUserStore } from "@/stores/userStore";

export default {
  data() {
    return {
      email: "amy@mail.com",
      password: "12345678",
      message: "",
      isChatIcon: true, // 標記是否顯示 chat icon
      isRotating: false, // 標記是否正在旋轉中
      isButtonsVisible: false, // 標記彈出的按鈕列表是否可見
    };
  },
  computed: {
    iconClass() {
      return this.isChatIcon ? "fas fa-comment" : "fas fa-times"; // 使用 Font Awesome 中的 chat icon 或叉叉 icon
    },
  },
  methods: {
    login() {
      const fd = new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);

      axios
        .post(`${this.API_URL}/user/login`, fd)
        .then((rs) => {
          console.log(rs.data.authentication);
          if(rs.data.authentication==3){
            var myModal = new bootstrap.Modal(document.getElementById('blockedAccountModal'));
            myModal.show();
          }else{
            const userStore = useUserStore();
            userStore.loginSuccess(rs.data);
            sessionStorage.setItem("loggedInMember", JSON.stringify(rs.data));
            this.$router.push("/");
          }
        })
        .catch(() => {
          this.message = "登入失敗";
        });
    },
    check() {
      axios.get(`${this.API_URL}/check`).then((rs) => console.log(rs.data));
    },
    gotoGoogleLoginPage() {
      window.location.href = "http://localhost:8080/mall/google-login";
    },
    gotoLineLoginPage() {
      window.location.href = "http://localhost:8080/mall/line-login";
    },
    async toggleButtons() {
      if (this.isRotating) return; // 如果已經在旋轉中，則不執行

      this.isRotating = true; // 開始旋轉

      await this.rotateIcon(); // 旋轉 icon

      // 切換 icon
      this.isChatIcon = !this.isChatIcon;

      this.isButtonsVisible = !this.isButtonsVisible; // 切換彈出的按鈕列表的可見狀態

      //await this.rotateIcon(); // 再次旋轉 icon

      this.isRotating = false; // 結束旋轉
    },
    rotateIcon() {
      return new Promise((resolve) => {
        const button = document.querySelector(".fixed-button");
        button.classList.add("rotate");

        // 監聽旋轉動畫結束事件
        button.addEventListener("animationend", () => {
          button.classList.remove("rotate");
          resolve();
        });
      });
    },
  },
};
</script>
<style scoped>
.fixed-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.fixed-button i {
  font-size: 25px;
}
.sub-button {
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2784e7;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sub-button i {
  font-size: 25px;
}

.rotate {
  animation: rotateIcon 0.3s linear;
}

@keyframes rotateIcon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

.buttons-container {
  position: fixed;
  bottom: 80px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slide-enter, .slide-leave-to  {
  transform: translateY(0);
  opacity: 1;
}

.slide-enter-to, .slide-leave  {
  transform: translateY(-100%);
  opacity: 0;
}


.sub-button {
  margin-top: 10px;
}

a {
  color: inherit;
  text-decoration: none;
}
a:link {
  color: inherit;
  text-decoration: none;
}

a:visited {
  color: inherit;
  text-decoration: none;
}
</style>
