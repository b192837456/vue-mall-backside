<template>
  <main class="container">
    <h1>意見反饋</h1>
    <button @click="showUnread" class="btn btn-warning" v-if="unread== false" >顯示未處理</button>
    <button @click="getfeedbacks" class="btn btn-outline-dark" v-else="unread== true ">顯示全部</button>
    <div class="table-frame">
    <table class="table table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">反饋編號</th>
          <th scope="col">會員ID</th>
          <th scope="col">會員Name</th>
          <th scope="col">訂單編號</th>
          <th scope="col">日期</th>
          <th scope="col">類型</th>
          <th scope="col">內容</th>
          <th scope="col">狀態</th>
          <th scope="col">回覆</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(feedback, index) in feedbacks" :key="index" :class="{ 'text-center': true }">
          <td>{{ feedback.feedbackID }}</td>
          <td>{{ feedback.userID }}</td>
          <td>{{ feedback.userName }}</td>
          <td>{{ feedback.orderID }}</td>
          <td>{{ formatDate(feedback.feedbackDate) }}</td>
          <td>{{ feedback.type }}</td>
          <td>{{ feedback.description }}</td>
          <td>{{ feedback.customerFeedbackStatus }}</td>

          <td>
            <button v-if="feedback.customerFeedbackStatus === '等待回覆中'" @click="openModal(feedback)">
              <i class="fa-solid fa-envelope"></i>
            </button>
            <button v-else-if="feedback.customerFeedbackStatus === '已回覆'" @click="handleCheckClick">
              <i class="fa-solid fa-envelope-circle-check"></i>
            </button>
            <button v-else-if="feedback.customerFeedbackStatus === '已完結'" disabled>
              <i class="fa-solid fa-square-check"></i>
            </button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
  </main>
  <!-- Modal -->
  <!-- <div class="modal" tabindex="-1" role="dialog" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">用戶明細</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="userId" style="font-size: larger;">用戶編號: {{ newMember.userId }}</label>
            </div>
            <div class="form-group">
              <label>第三方資訊:</label>
              <br />
              <ul class="list-unstyled">
                <li v-if="!newMember.thirdParty || newMember.thirdParty.length === 0" style="color: red;">未綁定</li>
                <li v-else v-for="(provider, index) in newMember.thirdParty" :key="index">
                  <div>
                    <label for="providerId">提供者ID:</label>
                    <input type="text" class="form-control" :id="'providerId' + index" v-model="provider.providerId"
                      readonly>
                  </div>
                  <div>
                    <label for="providerName">提供者名稱:</label>
                    <input type="text" class="form-control" :id="'providerName' + index" v-model="provider.providerName"
                      readonly>
                  </div>
                </li>
              </ul>
            </div>
            <div class="form-group">
              <label for="userName">用戶名稱:</label>
              <input type="text" class="form-control" id="userName" v-model="newMember.userName">
            </div>
            <div class="form-group">
              <label for="phone">電話:</label>
              <input type="text" class="form-control" id="phone" v-model="newMember.phone">
            </div>
            <div class="form-group">
              <label for="email">E-mail:</label>
              <input type="text" class="form-control" id="email" v-model="newMember.email">
            </div>
            <div class="form-group">
              <label for="lastLoginTime">最新登入時間:</label>
              <input type="text" class="form-control" id="lastLoginTime" :value="formatDate(newMember.lastLoginTime)"
                readonly>
            </div>
            <div class="form-group">
              <label for="registerDate">註冊時間:</label>
              <input type="text" class="form-control" id="registerDate" :value="formatDate(newMember.registerDate)"
                readonly>
            </div>
            <div class="form-group">
              <label for="userAddress">用戶地址:</label>
              <input type="text" class="form-control" id="userAddress" v-model="newMember.userAddress">
            </div>
            <div class="form-group">
              <label for="deliverAddress">預設運送地址:</label>
              <input type="text" class="form-control" id="deliverAddress" v-model="newMember.deliverAddress">
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary mr-2" @click="closeModal">Close</button>
              <button type="button" class="btn btn-primary" @click="saveProduct">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div> -->
  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">問題回覆</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="description" style="font-size: larger;">反饋問題: {{ feedback.description }} </label>
            </div>
            <div class="form-group">
              <label for="message" style="font-size: larger;">回覆內容: </label>
              <textarea class="form-control" id="message" v-model="message" style="height: 300px;"></textarea>
            </div>




            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary mr-2" @click="closeModal">Close</button>
              <button type="button" class="btn btn-primary"
                @click="sendBackendRecords(feedback.feedbackID)">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import axios from 'axios';
import modal from './Test.vue';

export default {
  data() {
    return {
      feedbacks: [],
      feedback: [],
      message: '',
      email: [],
      unread:false,

      user: [],
      usernameData: null,

    };
  },
  methods: {
    formatDate(dateTimeString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString('zh-TW', options);
    },
    getfeedbacks() {
      const loggedInMember = sessionStorage.getItem('loggedInMember');
    const loggedInMemberObject = JSON.parse(loggedInMember);
    console.log(loggedInMemberObject);
    if (loggedInMemberObject === null) {
      alert('請先登入');
      this.$router.push('/login');
    } else {
      const role = loggedInMemberObject.authentication;
      console.log(role);
      console.log(role);
      if (role == '1' || role == '0') {
         // alert('歡迎回來，管理者!!');
      } else {
       alert('權限不足');
        this.$router.push('/');
      }
    }
      axios.get(`${this.API_URL}/feedbacks`).then((rs) => {
        this.feedbacks = rs.data; // 将获取的数据存储在数组中
        this.unread = false
      })
    },
    openModal(feedback) {
      console.log(feedback);
      this.feedback = feedback;

      this.$refs.modal.classList.add('show');
      this.$refs.modal.style.display = 'block';
      document.body.classList.add('modal-open');

    },
    closeModal() {
      this.$refs.modal.classList.remove('show');
      this.$refs.modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    },
    sendBackendRecords(id) {
      const fd = new FormData();
      fd.append('message', this.message);
      fd.append('feedbackId', id);
      // console.log("sendBackendRecords", id)
      // console.log(this.message)
      // console.log(message)
      // 提示用戶確認是否回覆問題
      if (confirm("您確定要回覆這筆問題嗎？")) {
        this.showLoadingAnimation();
        // 使用axios發送POST請求
        axios.put(`${this.API_URL}/sendFeedbackEmail`, fd)
          .then((response) => {
            // 請求成功時的處理邏輯
            console.log("回覆成功:", response.data);
            // 可以在這裡添加其他處理邏輯，例如提示用戶回覆成功
            

            this.getfeedbacks();

          })
          .catch((error) => {
            // 請求失敗時的錯誤處理邏輯
            console.error("回覆失敗:", error);
            // 可以在這裡添加錯誤處理邏輯，例如提示用戶回覆失敗
          })
          .finally(() => {
            // 無論請求成功還是失敗，都要關閉模態對話框
            this.getfeedbacks();
            this.closeModal();
          });
      } else {
        // 如果用戶取消回覆，也要關閉模態對話框
        this.closeModal();
      }
    },
    showLoadingAnimation() {
      // 創建一個新的<div>元素來顯示等待動畫
      const loadingDiv = document.createElement('div');
      loadingDiv.id = 'loadingDiv';
      loadingDiv.style.position = 'fixed';
      loadingDiv.style.top = '50%';
      loadingDiv.style.left = '50%';
      loadingDiv.style.transform = 'translate(-50%, -50%)';
      loadingDiv.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      loadingDiv.style.padding = '20px';
      loadingDiv.style.borderRadius = '10px';

      // 添加旋轉圖示
      const spinner = document.createElement('div');
      spinner.className = 'spinner-border text-primary';
      spinner.style.width = '3rem';
      spinner.style.height = '3rem';
      spinner.style.display = 'block';
      spinner.style.margin = 'auto';

      // 將旋轉圖示添加到loadingDiv中
      loadingDiv.appendChild(spinner);

      // 將loadingDiv添加到body中
      document.body.appendChild(loadingDiv);
    },

    hideLoadingAnimation() {
      // 從DOM中移除loadingDiv元素
      const loadingDiv = document.getElementById('loadingDiv');
      if (loadingDiv) {
        loadingDiv.parentNode.removeChild(loadingDiv);
      }
    },
    showUnread() {
      axios.get(`${this.API_URL}/unreadFeedbacks`).then((rs) => {
        this.feedbacks = rs.data; // 将获取的数据存储在数组中
        console.log(this.feedbacks)
        this.unread = true
      })
    
    },
   



  },
  computed: {


  },
  created() {
    this.getfeedbacks();

  }
}

</script>
<style scoped>
/* .container {
  max-width: 95%;
  overflow-x: auto;  啟用水平捲動
} */

.custom-link {
  background-color: transparent;
  /* 背景透明 */
  color: black;
  /* 文字颜色 */
  /* padding: 7px; */
  /* 设置内边距 */
  display: inline-block;
  /* 让链接变成行内块元素，以便控制宽度和高度 */
  position: relative;
  /* 使得子元素的绝对定位相对于父元素 */
  text-decoration: none;
  /* 移除下划线 */
  transition: color 0.3s;
  /* 添加文字颜色的过渡效果 */
  /* top: 10px; */
}

.custom-link:hover {
  color: gray;
  /* 鼠标移上去时文字颜色变为灰色 */
}

.custom-link b-icon {
  display: block;
  /* 将图标变为块级元素 */
  position: absolute;
  /* 绝对定位，以便于控制位置 */
  top: -10px;
  /* 将图标上移 */
  left: 50%;
  /* 水平居中 */
  transform: translateX(-50%);
  /* 水平居中 */
}

.btn-outline-dark {
  position: absolute;
  top: 70px;
  right: 65px;
  margin: 10px;
  /* 调整按钮与表格的间距 */
  border: 2px solid black;
}
.btn-warning {
  position: absolute;
  top: 70px;
  right: 65px;
  margin: 10px;
  /* 调整按钮与表格的间距 */
  /* border: 2px solid yellow; */
}

.modal-header {
  position: relative;
  /* 使得 .modal-header 成为定位上下文 */
}

.close {
  position: absolute;
  /* 相对于 .modal-header 定位 */
  top: 10px;
  /* 调整关闭按钮与顶部的距离 */
  right: 10px;
  /* 调整关闭按钮与右侧的距离 */
}

.table-frame {
  border: 3px solid #ADADAD;
  border-radius: 10px;
  padding: 10px 30px;
}

.table thead th {
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 2;
  /* 確保標題行在上方 */
  background-color: #ffffff;
  /* 可以選擇性地設置背景色 */
}

.table tbody td {
  white-space: normal;
  vertical-align: middle;
}

/* 定義主顏色 */
:root {
  --primary-color: #007bff;
}

/* 定義按鈕樣式 */
.table button {
  border: 1px solid #5B5B5B;
  border-radius: 20px;
  padding: 6px 12px;
  background-color: transparent;
  color: #5B5B5B;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* 按鈕懸停時變化 */
.table button:hover {
  background-color: #5B5B5B;
  color: #E0E0E0;
}

.table button {
  margin-right: 0px;
  /* 設定按鈕的右邊距 */
}

.actionButton {
  color: black;
  border-color: black;
  transition: color 0.3s, border-color 0.3s;
  /* 添加過渡效果 */
}

.actionButton:hover {
  color: gray;
  /* 滑鼠移上時改變顏色 */
}

.actionButton:active {
  color: darkgray;
  /* 按下按鈕時改變顏色 */
}
</style>
