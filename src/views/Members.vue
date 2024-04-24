<template>
  <main class="container">
    <h1>會員管理</h1>
    <button type="button" class="btn btn-warning" @click=" showbanuser" v-if="banyesorno== false">顯示停權用戶</button>
    <button type="button" class="btn btn-outline-dark" @click=" showbanuser" v-if="banyesorno== true">顯示所有用戶</button>
    <input type="text" v-model="searchTerm" class="form-control" placeholder="搜尋用戶">
    <div class="table-frame">
      <table class="table table-hover">
        <thead>
          <tr class="text-center">
            <th scope="col">會員編號</th>
            <th scope="col">會員名稱</th>
            <th scope="col">e-mail</th>
            <th scope="col">手機</th>
            <th scope="col">會員狀態</th>
            <th scope="col">註冊時間</th>
            <th scope="col">上次登入時間</th>
            <th scope="col">會員資料</th>
            <th scope="col">停權</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, index) in filteredmembers" :key="index"
            :class="{ 'text-center': true, 'front.red': member.authentication === 3 }">
            <td>{{ member.userId }}</td>
            <td>{{ member.userName }}</td>
            <td>{{ member.email }}</td>
            <td>{{ member.phone }}</td>
            <td>
              {{ member.authentication === 2 ? '一般會員' : (member.authentication === 1 ? '管理者' : (member.authentication
                ===
                0 ? '系統管理員' : (member.authentication === 3 ? '已停權' : member.authentication))) }}
            </td>
            <td>{{ formatDate(member.registerDate) }}</td>
            <td>{{ formatDate(member.lastLoginTime) }}</td>
            <td><button @click="openModal(member)"><i class="fa-solid fa-user-pen"></i></button></td>
            <td>
              <button v-if="member.authentication == 2" @click="ban(member)">
                <i class="fa-solid fa-ban"></i></button>
              
              <button v-else @click="unban(member)">
                <i class="fa-solid fa-arrow-rotate-left"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="modal">
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
              <!-- <input type="text" class="form-control" id="userId" v-model="newMember.userId" readonly> -->
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
                    <label for="providerName">綁定平台:</label>
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
              <button type="button" class="btn btn-primary" @click="saveMember">Save</button>
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
      members: [],// 将数据保存在数组中
      newMember: [],
      searchTerm: '', // 定義搜索條件的數據屬性
      filteredmembers: [] ,// 定義過濾後的成員數組的數據屬性
      banyesorno: false,
    };
  },
  watch: {
    searchTerm(newValue) {
      this.search();
      console.log(newValue);
    },
  },
  methods: {
    saveMember() {
      this.newMember.userID = this.newMember.userId;
      console.log(this.newMember);
      axios.put(`${this.API_URL}/update/memberdataupdate`, this.newMember).then((rs) => {
        console.log(rs.data);
        alert('修改成功');
      })
    },
    search() {
      // 根據搜索條件過濾產品列表
      if (this.searchTerm.trim() === '') {
        // 如果搜索條件為空，顯示所有產品
        this.filteredmembers = this.members;
        console.log(this.filteredmembers);
        console.log('成功搜尋');
      } else {
        // 否則，過濾產品列表
        this.filteredmembers = this.members.filter(member => {
          const userName = member.userName?.toLowerCase() || '';
          const email = member.email?.toLowerCase() || '';
          const phone = member.phone?.toString() || '';
          const searchTerm = this.searchTerm.toLowerCase();
          return userName.includes(searchTerm) ||
            email.toString().includes(searchTerm) ||
            phone.includes(searchTerm)
            ;
        });
        console.log(this.filteredmembers);
      }
    },
    showbanuser() {
      if(this.banyesorno == false){
        
        this.filteredmembers = this.members.filter(member => {
          return member.authentication == '3';
        })
        this.banyesorno = true;
      }else{
        this.filteredmembers = this.members
        this.banyesorno = false;
      }
    },
    ban(member) {
      console.log(member.userId)
      axios.put(`${this.API_URL}/user/banUser?id=${member.userId}`).then((rs) => {
        console.log(rs.data);
        this.getmemebers();
        this.$router.go(0);
      })
    },
    unban(member) {
      axios.put(`${this.API_URL}/user/unbanUser?id=${member.userId}`).then((rs) => {
        console.log(rs.data);
        this.getmemebers();
      })
    },
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
    getmemebers() {
      axios.get(`${this.API_URL}/user/getAllUsers`).then((rs) => {
        this.members = rs.data;
        this.filteredmembers = this.members
      })
    },
    openModal(member) {
      this.$refs.modal.classList.add('show');
      this.$refs.modal.style.display = 'block';
      document.body.classList.add('modal-open');
      console.log(this.member);
      this.newMember = member;
      console.log(this.newMember);
    },
    closeModal() {
      this.$refs.modal.classList.remove('show');
      this.$refs.modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    },
  },
  created() {
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
      } else {
        alert('權限不足');
        this.$router.push('/');
      }
    }
    this.getmemebers();
    this.filteredmembers = this.members;
  }
}

</script>
<style scoped>
.custom-link {
  background-color: transparent;
  color: black;
  display: inline-block;
  position: relative;
  text-decoration: none;
  transition: color 0.3s;
}

.custom-link:hover {
  color: gray;
}

.custom-link b-icon {
  display: block;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.btn-outline-dark {
  position: absolute;
  top: 70px;
  right: 65px;
  margin: 10px;
  border: 2px solid black;
}
.btn-warning {
  position: absolute;
  top: 70px;
  right: 65px;
  margin: 10px;
}

.modal-header {
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
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
  background-color: #ffffff;
}

.table tbody td {
  white-space: normal;
  vertical-align: middle;
}

:root {
  --primary-color: #007bff;
}


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


.table button:hover {
  background-color: #5B5B5B;
  color: #E0E0E0;
}

.table button {
  margin-right: 0px;
}

.actionButton {
  color: black;
  border-color: black;
  transition: color 0.3s, border-color 0.3s;
}

.actionButton:hover {
  color: gray;
}

.actionButton:active {
  color: darkgray;
}
</style>
