<template>
  <main class="container">
    <h2>訂單管理</h2>

    <!-- 移到表格外部 -->
    <button
        type="button"
        class="btn btn-outline-dark"
        @click="exportToExcel"
    >
      Excel
    </button>
    <button
        type="button"
        class="btn btn-outline-dark"
        @click="exportToPDF"
    >
      PDF
    </button>
    <button
        type="button"
        class="btn btn-outline-dark"
        @click="openInsertModal"
    >
      新增
    </button>
    <br/>

    <input
        type="text"
        v-model="searchTerm"
        class="form-control"
        placeholder="搜尋訂單"
    />
    <br/>

    <div class="table-frame">
      <table class="table table-hover" ref="ordersTable">
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
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in filteredOrders" :key="order.orderId" class="text-center">
          <td>{{ order.orderId }}</td>
          <td>{{ formatDate(order.orderDate) }}</td>
          <td>{{ order.orderStatus }}</td>
          <td>{{ order.deliverAddress }}</td>
          <td>{{ order.recipientName }}</td>
          <td>{{ order.recipientPhone }}</td>
          <td>
            <button @click="redirectToOrdersDetail(order)">
              <i class="fas fa-list"></i>
            </button>
          </td>
          <td>
            <button @click="openEditModal(order)">
              <i class="fas fa-pen"></i>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
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
              <label for="userId">會員編號</label>
              <input
                  type="text"
                  class="form-control"
                  id="userId"
                  v-model="NewOrder.userId"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="orderDate">訂購日期</label>
              <input
                  type="text"
                  class="form-control"
                  id="orderDate"
                  v-model="NewOrder.orderDate"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="paymentMethod">付款方式</label>
              <input
                  type="text"
                  class="form-control"
                  id="paymentMethod"
                  v-model="NewOrder.paymentMethod"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="orderStatus">訂單狀態</label>
              <input
                  type="text"
                  class="form-control"
                  id="orderStatus"
                  v-model="NewOrder.orderStatus"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="deliverDate">寄送日期</label>
              <input
                  type="text"
                  class="form-control"
                  id="deliverDate"
                  v-model="NewOrder.deliverDate"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="pickupDate">收件日期</label>
              <input
                  type="text"
                  class="form-control"
                  id="pickupDate"
                  v-model="NewOrder.pickupDate"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="deliverAddress">送貨地址</label>
              <input
                  type="text"
                  class="form-control"
                  id="deliverAddress"
                  v-model="NewOrder.deliverAddress"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="recipientName">收件人姓名</label>
              <input
                  type="text"
                  class="form-control"
                  id="recipientName"
                  v-model="NewOrder.recipientName"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="recipientPhone">收件人手機</label>
              <input
                  type="text"
                  class="form-control"
                  id="recipientPhone"
                  v-model="NewOrder.recipientPhone"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="paymentTime">付款日期</label>
              <input
                  type="text"
                  class="form-control"
                  id="paymentTime"
                  v-model="NewOrder.paymentTime"
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

  <!-- 修改訂單Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="editModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">修改訂單</h5>
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
            <!-- <div class="form-group">
              <label for="userId">會員編號</label>
              <input
                type="text"
                class="form-control"
                id="userId"
                v-model="NewOrder.userId"
              />
            </div> -->
            <div class="form-group">
              <label for="orderDate">訂購日期</label>
              <input
                  type="text"
                  class="form-control"
                  id="orderDate"
                  v-model="NewOrder.orderDate"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="paymentMethod">付款方式</label>
              <input
                  type="text"
                  class="form-control"
                  id="paymentMethod"
                  v-model="NewOrder.paymentMethod"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="orderStatus">訂單狀態</label>
              <br/>
              <select v-model="NewOrder.orderStatus">
                <option v-for="status in statuses" :value="status">
                  {{ status }}
                </option>
              </select>
              <!-- <input
                type="text"
                class="form-control"
                id="orderStatus"
                v-model="NewOrder.orderStatus"
              /> -->
            </div>
            <br/>
            <div class="form-group">
              <label for="deliverDate">寄送日期</label>
              <input
                  type="text"
                  class="form-control"
                  id="deliverDate"
                  v-model="NewOrder.deliverDate"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="pickupDate">收件日期</label>
              <input
                  type="text"
                  class="form-control"
                  id="pickupDate"
                  v-model="NewOrder.pickupDate"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="deliverAddress">送貨地址</label>
              <input
                  type="text"
                  class="form-control"
                  id="deliverAddress"
                  v-model="NewOrder.deliverAddress"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="recipientName">收件人姓名</label>
              <input
                  type="text"
                  class="form-control"
                  id="recipientName"
                  v-model="NewOrder.recipientName"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="recipientPhone">收件人手機</label>
              <input
                  type="text"
                  class="form-control"
                  id="recipientPhone"
                  v-model="NewOrder.recipientPhone"
              />
            </div>
            <br/>
            <div class="form-group">
              <label for="paymentTime">付款日期</label>
              <input
                  type="text"
                  class="form-control"
                  id="paymentTime"
                  v-model="NewOrder.paymentTime"
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
                  @click="saveEditedOrder"
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
import jsPDF from "jspdf";
import "jspdf-autotable";
import ArialUnicodeMS from "../assets/fonts/ArialUnicodeMS.ttf";
import * as XLSX from "xlsx"; // 使用具名導入方式

export default {
  data() {
    return {
      orders: [],
      NewOrder: {
        //和後端receiveOrdersDTO的屬性要一致
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
      statuses: ["處理中", "已完結", "已取消"], // 可選擇的訂單狀態
      searchTerm: "",
      filteredOrders: [],
    };
  },

  watch: {
    searchTerm(newValue) {
      this.search();
    },
  },

  methods: {

    exportToPDF() {
      const doc = new jsPDF();

      // 添加字體
      doc.addFont(ArialUnicodeMS, "ArialUnicodeMS"); // 為字體指定一個名稱

      // 將表格轉換成可匯出的格式
      const table = this.$refs.ordersTable;

      // 將表格內容加入 PDF 中
      doc.setFont("ArialUnicodeMS"); // 設置字體
      doc.text("Orders", 10, 10); // 添加繁體中文文本
      doc.autoTable({
        html: table,
        startY: 20, // 表格的起始Y座標
        margin: {top: 20}, // 表格的邊距
        styles: {
          font: "ArialUnicodeMS",
          //這裏設置字體樣式
          fontStyle: "normal",
          overflow: 'linebreak', // 設置表格內容溢出時的處理方式
        },
      });

      // 下載 PDF
      doc.save("訂單列表.pdf");
    },

    exportToExcel() {
      // 設定要匯出的資料
      const data = this.filteredOrders.map((order) => ({
        訂單編號: order.orderId,
        訂購日期: this.formatDate(order.orderDate),
        訂單狀態: order.orderStatus,
        送貨地址: order.deliverAddress,
        收件人姓名: order.recipientName,
        收件人手機: order.recipientPhone,
      }));

      // 創建新的Workbook
      const wb = XLSX.utils.book_new();
      // 將資料轉換為Worksheet
      const ws = XLSX.utils.json_to_sheet(data);
      // 將Worksheet添加到Workbook中
      XLSX.utils.book_append_sheet(wb, ws, "訂單列表");

      // 將Workbook轉換為二進制數據
      const wbBinary = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });

      // 創建Blob對象
      const blob = new Blob([wbBinary], {type: "application/octet-stream"});

      // 下載Excel檔
      const fileName = "訂單列表.xlsx";
      if (navigator.msSaveBlob) {
        // For IE
        navigator.msSaveBlob(blob, fileName);
        console.log(blob);
      } else {
        // For other browsers
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log(blob);
        console.log(link);
      }
    },

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

    search() {
      // 根據搜索條件過濾訂單列表
      if (this.searchTerm.trim() === "") {
        // 如果搜索條件為空，顯示所有訂單
        this.filteredOrders = this.orders;
        console.log("成功搜尋");
      } else {
        // 否則，過濾訂單列表
        this.filteredOrders = this.orders.filter(
            (order) => order.orderId.toString().includes(this.searchTerm) ||
                order.orderStatus.includes(this.searchTerm) ||
                order.deliverAddress.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                order.recipientName.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }
    },

    redirectToOrdersDetail(order) {
      sessionStorage.setItem('x', order.orderId);
      sessionStorage.setItem('y', order.orderDate);
      console.log(order.orderId)
      this.$router.push({
        path: "/orders/detail",
        query: {
          x: order.orderId,
          y: order.orderDate,
        },
      });
    },

    demoInsertModal() {
      this.NewOrder.userId = "2";
      this.NewOrder.orderDate = "2024-04-26";
      this.NewOrder.paymentMethod = "Paypal";
      this.NewOrder.orderStatus = "處理中";
      this.NewOrder.deliverDate = "2024-04-26";
      this.NewOrder.pickupDate = "2024-04-26";
      this.NewOrder.deliverAddress = "台北市信義區公園南路123號";
      this.NewOrder.recipientName = "王小明";
      this.NewOrder.recipientPhone = "0911222333";
      this.NewOrder.paymentTime = "2024-04-26";
    },

    saveOrder() {
      console.log("New Order:", this.NewOrder);
      axios
          .post(`${this.API_URL}/orders/insertOrders`, this.NewOrder)
          .then((response) => {
            this.resetFormData(); //清空表單數據
            console.log(response.data);
            // this.fetchData();
            this.closeInsertModal();
            this.$router.go();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
    },

    saveEditedOrder() {
      console.log("New Order:", this.NewOrder);
      axios
          .put(
              `${this.API_URL}/orders/updateOrder/${this.NewOrder.orderId}`,
              this.NewOrder
          )
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
    },

    // updateOrderStatus(specifiedOrderId, newStatus) {
    //   if (confirm("您確定要更改訂單狀態嗎？")) {
    //     axios
    //       .put(
    //         `${this.API_URL}/orders/updateOrderStatusByOrderId/${specifiedOrderId}`,
    //         newStatus
    //       )
    //       .then((response) => {
    //         console.log(response.data);
    //         // 如果成功，更新訂單列表中相應訂單的狀態
    //         const updatedOrder = this.orders.find(
    //           (order) => order.orderId === specifiedOrderId
    //         );
    //         if (updatedOrder) {
    //           updatedOrder.orderStatus = newStatus;
    //         }
    //         this.$router.go();
    //       })
    //       .catch((error) => {
    //         console.error("Error in updating order status:", error);
    //       });
    //   } else {
    //     // 如果用戶取消操作，則不執行更改訂單邏輯
    //     console.log("取消更改");
    //   }
    // },

    resetFormData() {
      this.NewOrder = {
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

    openEditModal(order) {
      this.$refs.editModal.classList.add("show");
      this.$refs.editModal.style.display = "block";
      document.body.classList.add("modal-open");
      this.NewOrder = order;
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

    axios
        .get(`${this.API_URL}/orders/findAll`)
        .then((rs) => {
          console.log(rs.data);
          this.orders = rs.data;
          this.search();
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
  },
};
</script>

<style scoped>
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
  float: right; /* 讓按鈕靠右浮動 */
  margin-left: 10px; /* 調整按鈕間距 */
  margin-bottom: 5px;
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
  z-index: 2; /* 確保標題行在上方 */
}

.table tbody td {
  white-space: nowrap;
  vertical-align: bottom;
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
  margin-right: 0px; /* 設定按鈕的右邊距 */
}

/* 按鈕懸停時變化 */
.table button:hover {
  background-color: #5B5B5B;
  color: #E0E0E0;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
  backdrop-filter: blur(0.2px); /* 背景模糊效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加陰影效果 */
}

.modal-header {
  background-color: #E0E0E0; /* 淺灰色背景 */
  position: relative; /* 使得 .modal-header 成为定位上下文 */
}

.modal-title {
  font-weight: bold; /* 將 modal 內容文字設置為粗體 */
}

.modal-body {
  font-weight: bold; /* 將 modal 內容文字設置為粗體 */
}

.modal-footer {
  background-color: #E0E0E0; /* 淺灰色背景 */
}

.modal button {
  background-color: #FFFFFF; /* 使用主顏色 */
  color: #000000; /* 文字顏色 */
  border: 1.5px solid #000000; /* 邊框 */
  border-radius: 5px; /* 圓角 */
  padding: 6px 10px; /* 調整內邊距 */
  cursor: pointer; /* 滑鼠指標 */
  transition: background-color 0.3s, color 0.3s; /* 添加過渡效果 */
  margin-left: 5px; /* 調整按鈕間距 */
}

.modal button:hover {
  background-color: #000000; /* 按鈕懸停時的背景顏色 */
  color: #FFFFFF;
}

.form-control {
  border-width: 1.5px; /* 設置邊框寬度為 2px */
  border-style: solid; /* 使用實線邊框 */
  border-color: #ADADAD; /* 設置邊框顏色 */
}

</style>
