<template>
  <main class="container">
    <h2>訂單明細</h2>
    <br/>

    <h7 class="subtitle">
      訂單編號：{{ x }}<br/>
      訂購日期：{{ formatDate(y) }}<br/>
    </h7>
    <br/>

    <!-- 移到表格外部 -->
    <button type="button" class="btn btn-primary btn-add" @click="openInsertModal">
      新增
    </button>

    <button
        type="button"
        class="btn btn-outline-dark"
        @click="redirectToOrdersPrint(x)"
    >
      列印
    </button>

    <table class="table table-striped table-hover">
      <thead>
      <tr class="text-center">
        <th scope="col">訂單編號</th>
        <th scope="col">產品名稱</th>
        <th scope="col">顏色</th>
        <th scope="col">訂購數量</th>
        <th scope="col">價格</th>
        <th scope="col">修改</th>
        <th scope="col">刪除</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="odDTO in filteredOrdersDetailDTOs"
          :key="odDTO.ordersDetailId"
          class="text-center"
      >
        <td>{{ odDTO.orderId }}</td>
        <td>{{ odDTO.productName }}</td>
        <td>{{ odDTO.color }}</td>
        <td>{{ odDTO.quantity }}</td>
        <td>{{ odDTO.price }}</td>
        <td>
          <button @click="openEditModal(odDTO)">
            <i class="fas fa-pen"></i>
          </button>
        </td>
        <td>
          <button @click="deleteOrdersDetail(odDTO)">
            <i class="fas fa-trash"></i>
          </button>
          <!-- <button v-else @click="changeSalesStatus(product.productId)">
            <i class="fas fa-xmark"></i>
          </button> -->
        </td>
      </tr>
      </tbody>
    </table>
  </main>

  <!-- 新增訂單明細Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="insertModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增訂單明細</h5>
          <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeInsertModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="specId">產品規格編號</label>
              <input
                  type="text"
                  class="form-control"
                  id="specId"
                  v-model="NewOrdersDetail.specId"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="quantity">訂購數量</label>
              <input
                  type="text"
                  class="form-control"
                  id="quantity"
                  v-model="NewOrdersDetail.quantity"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="price">產品單價</label>
              <input
                  type="text"
                  class="form-control"
                  id="price"
                  v-model="NewOrdersDetail.price"
              />
            </div>
            <br/>
            <div class="d-flex justify-content-end">
              <!-- 新添加的 div -->
              <button
                  type="button"
                  class="btn"
                  @click="demoInsertModal"
              >
                DEMO
              </button>
              <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeInsertModal"
              >
                Close
              </button>
              <button
                  type="submit"
                  class="btn btn-primary ml-2"
                  @click="saveOrdersDetail"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>

  <!-- 修改訂單明細Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="editModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">修改訂單明細</h5>
          <button
              type="button"
              class="close"
              aria-label="Close"
              @click="closeEditModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="specId">產品規格編號</label>
              <input
                  type="text"
                  class="form-control"
                  id="specId"
                  v-model="NewOrdersDetail.specId"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="quantity">訂購數量</label>
              <input
                  type="text"
                  class="form-control"
                  id="quantity"
                  v-model="NewOrdersDetail.quantity"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="price">產品單價</label>
              <input
                  type="text"
                  class="form-control"
                  id="price"
                  v-model="NewOrdersDetail.price"
              />
            </div>
            <br/>
            <div class="d-flex justify-content-end">
              <!-- 新添加的 div -->
              <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeEditModal"
              >
                Close
              </button>
              <button
                  type="submit"
                  class="btn btn-primary ml-2"
                  @click="saveEditedOrdersDetail"
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      x: this.$route.query.x,
      y: this.$route.query.y,
      ordersDetailDTOs: [],
      NewOrdersDetail: {
        ordersDetailId: '',
        orderId: '',
        specId: '',
        quantity: '',
        price: '',
      },
    };
  },

  methods: {
    redirectToOrdersPrint(x) {
      sessionStorage.setItem('x', x);
      console.log(x)
      this.$router.push({
        path: "/orders/print",
        query: {
          xOrderId: x,
        },
      });
    },

    formatDate(dateTimeString) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit",
      };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString("zh-TW", options);
    },

    demoInsertModal() {
      this.NewOrdersDetail.specId = "C131101";
      this.NewOrdersDetail.quantity = "1";
      this.NewOrdersDetail.price = "27900";
    },

    saveOrdersDetail() {
      if (confirm("您確定要儲存這項資料嗎？")) {
        this.NewOrdersDetail.orderId = this.x
        console.log('New OrdersDetail:', this.NewOrdersDetail);
        axios.post(`${this.API_URL}/orders/insertOrdersDetail`, this.NewOrdersDetail)
            .then(response => {
              this.resetFormData(); //清空表單數據
              console.log(response.data);
              // this.fetchData(); //→這句的目的是什麼？
              this.closeInsertModal();
              this.$router.go();
            })
            .catch(error => {
              console.error('Error:', error);
            });
      } else {
        // 如果用戶取消保存操作，則不執行保存邏輯
        console.log('取消保存');
      }
    },

    saveEditedOrdersDetail() {
      if (confirm("您確定要儲存這次的編輯嗎？")) {
        this.NewOrdersDetail.orderId = this.x
        console.log('New OrdersDetail:', this.NewOrdersDetail);
        axios
            .put(`${this.API_URL}/orders/updateOrdersDetail/${this.NewOrdersDetail.ordersDetailId}`, this.NewOrdersDetail)
            .then((response) => {
              this.resetFormData(); //清空表單數據
              console.log(response.data);
              // this.fetchData();
              this.closeEditModal();
              this.$router.go();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
      } else {
        // 如果用戶取消保存操作，則不執行保存邏輯
        console.log("取消保存");
      }
    },

    deleteOrdersDetail(odDTO) {
      if (confirm("您確定要刪除這筆明細嗎？")) {
        axios.delete(`${this.API_URL}/orders/deleteOrdersDetail/${odDTO.ordersDetailId}`)
            .then(response => {
              this.ordersDetailDTOs = this.ordersDetailDTOs.filter(ordersDetail => ordersDetail !== odDTO);
              console.log('刪除成功');
              this.$router.go();
            })
            .catch(error => {
              console.error('Error deleting product:', error);
            });
      }
    },

    resetFormData() {
      this.NewOrdersDetail = {
        ordersDetailId: '',
        orderId: '',
        specId: '',
        quantity: '',
        price: '',
      };
    },

    openInsertModal() {
      this.$refs.insertModal.classList.add("show");
      this.$refs.insertModal.style.display = "block";
      document.body.classList.add("modal-open");
    },

    closeInsertModal() {
      this.$refs.insertModal.classList.remove("show");
      this.$refs.insertModal.style.display = "none";
      document.body.classList.remove("modal-open");
      this.resetFormData();
    },

    openEditModal(odDTO) {
      this.$refs.editModal.classList.add("show");
      this.$refs.editModal.style.display = "block";
      document.body.classList.add("modal-open");
      this.NewOrdersDetail.ordersDetailId = odDTO.ordersDetailId;
      this.NewOrdersDetail.specId = odDTO.specId;
      this.NewOrdersDetail.quantity = odDTO.quantity;
      this.NewOrdersDetail.price = odDTO.price;
    },

    closeEditModal() {
      this.$refs.editModal.classList.remove("show");
      this.$refs.editModal.style.display = "none";
      document.body.classList.remove("modal-open");
      this.resetFormData();
    },
  },

  mounted() {
    const loggedInMember = sessionStorage.getItem('loggedInMember');
    const loggedInMemberObject = JSON.parse(loggedInMember);
    console.log(loggedInMemberObject);
    if (loggedInMemberObject === null) {
      alert('請先登入');
      this.$router.push('/login');
    } else {
      const role = loggedInMemberObject.authentication;
      console.log(role);
      if (role == '1' || role == '0') {
        // alert('歡迎回來，管理者!!');
      } else {
        alert('權限不足');
        this.$router.push('/');
      }
    }

    this.x = sessionStorage.getItem("x")
    this.y = sessionStorage.getItem("y")

    axios
        .get(`${this.API_URL}/orders/findAllOrdersDetailDTOs`)
        .then((rs) => {
          console.log(rs.data);
          this.ordersDetailDTOs = rs.data;
        });
  },

  computed: {
    filteredOrdersDetailDTOs() {
      const specificOrderId = this.x;
      // 使用 Array.prototype.filter 方法來過濾資料
      return this.ordersDetailDTOs.filter(
          (odDTO) => odDTO.orderId == specificOrderId
      );
    },
  },
};
</script>

<style scoped>
/* .container {
  max-width: 95%;
  overflow-x: auto;  啟用水平捲動
} */

.subtitle {
  color: grey;
}

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

.btn-add {
  position: absolute;
  top: 160px;
  right: 105px;
  margin: 10px;
  /* 调整按钮与表格的间距 */
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

.table thead th {
  white-space: nowrap;
}

.table tbody th {
  white-space: nowrap;
}

/* 定義主顏色 */
:root {
  --primary-color: #007bff;
}

/* 定義按鈕樣式 */
.table button {
  border: 1px solid var(--primary-color);
  border-radius: 20px;
  padding: 6px 12px;
  background-color: transparent;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

/* 按鈕懸停時變化 */
.table button:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.table button {
  margin-right: 0px;
  /* 設定按鈕的右邊距 */
}

.table thead th {
  position: sticky;
  top: 0;
  z-index: 2; /* 確保標題行在上方 */
  background-color: #fff; /* 可以選擇性地設置背景色 */
}
</style>
