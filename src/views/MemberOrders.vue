<template>
  <main class="container">
    <h2>訂單管理</h2>
    <br />

    <!-- 移到表格外部 -->
    <button
      type="button"
      class="btn btn-primary btn-add"
      @click="openInsertModal"
    >
      新增
    </button>

    <table class="table table-striped table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">訂單編號</th>
          <th scope="col">訂購日期</th>
          <th scope="col">訂單狀態</th>
          <th scope="col">送貨地址</th>
          <th scope="col">收件人姓名</th>
          <th scope="col">收件人手機</th>
          <th scope="col">明細</th>
          <th scope="col">修改</th>
          <th scope="col">註銷</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="o in orders" :key="o.orderId" class="text-center">
          <td>{{ o.orderId }}</td>
          <td>{{ formatDate(o.orderDate) }}</td>
          <td>{{ o.orderStatus }}</td>
          <td>{{ o.deliverAddress }}</td>
          <td>{{ o.recipientName }}</td>
          <td>{{ o.recipientPhone }}</td>
          <td>
            <button @click="redirectToOrdersDetail(o)">
              <i class="fas fa-list"></i>
            </button>
          </td>
          <td>
            <button @click="openEditModal(o)">
              <i class="fas fa-pen"></i>
            </button>
          </td>
          <td>
            <button @click="changeOrderStatus(o.orderId)">
              <i class="fas fa-check"></i>
            </button>
            <!-- <button v-else @click="changeSalesStatus(product.productId)">
              <i class="fas fa-xmark"></i>
            </button> -->
          </td>
          <!-- <td>
            <button class="btn btn-primary" @click="reorderByOrderId(o)">
              重新下單
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </main>

  <!-- 新增訂單Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="insertModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增訂單</h5>
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
              <label for="recipientName">會員編號</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.userId"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">訂購日期</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.orderDate"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">付款方式</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.paymentMethod"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">訂單狀態</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.orderStatus"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">寄送日期</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.deliverDate"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">收件日期</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.pickupDate"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">送貨地址</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.deliverAddress"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.recipientName"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">收件人手機</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.recipientPhone"
              />
            </div>
            <div class="form-group">
              <label for="recipientName">付款日期</label>
              <input
                type="text"
                class="form-control"
                id="recipientName"
                v-model="NewOrder.paymentTime"
              />
            </div>
            <div class="d-flex justify-content-end">
              <!-- 新添加的 div -->
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
                @click="saveOrder"
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
      orders: [],
      NewOrder: {
        orderId: "",
        userId: "",
        orderDate: "",
        paymentMethod: "",
        orderStatus: "",
        deliverDate: "",
        pickupDate: "",
        deliverAddress: "",
        recipientName: "",
        recipientPhone: "",
        paymentTime: "",
      },
    };
  },

  methods: {
    formatDate(dateTimeString) {
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // weekday: "long",
      };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString("zh-TW", options);
    },

    redirectToOrdersDetail(o) {
      this.$router.push({
        path: "/orders/detail",
        query: {
          x: o.orderId,
          y: o.orderDate,
          // z: product.price,
        },
      });
    },

    // reorderByOrderId(order) {
    //   if (confirm("您確定要重新下單嗎？")) {
    //     console.log("orderId:", order.orderId);
    //     axios
    //       .post(`${this.API_URL}/api/orders/reorder?orderId=${order.orderId}`)
    //       .then((response) => {
    //         console.log(response.data);
    //       })
    //       .catch((error) => {
    //         console.error("Error:", error);
    //       });
    //   } else {
    //     console.log("取消"); //如果用戶取消重新下單動作，則不執行重新下單邏輯
    //   }
    // },

    saveOrder() {
      if (confirm("您確定要儲存這項資料嗎？")) {
        console.log("New Order:", this.NewOrder);

        axios
          .post(`${this.API_URL}/api/orders/insertOrders`, this.NewOrder)
          .then((response) => {
            this.resetFormData(); //清空表單數據
            console.log(response.data);
            // this.fetchData();
            this.closeInsertModal();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      } else {
        // 如果用戶取消保存操作，則不執行保存邏輯
        console.log("取消保存");
      }
    },

    resetFormData() {
      this.NewOrder = {
        userId: "",
        orderDate: "",
        paymentMethod: "",
        orderStatus: "",
        deliverDate: "",
        pickupDate: "",
        deliverAddress: "",
        recipientName: "",
        recipientPhone: "",
        paymentTime: "",
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
    },
  },

  mounted() {
    axios.get(`${this.API_URL}/api/orders/findAll`).then((rs) => {
      console.log(rs.data);
      this.orders = rs.data;
    });
  },
};
</script>

<style>
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

.btn-add {
  position: absolute;
  top: 90px;
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
