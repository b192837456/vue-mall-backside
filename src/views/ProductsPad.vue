<template>
  <main class="container">
    <h1>Pad產品</h1>
    <button type="button" class="btn btn-outline-dark btn-add" @click="openModal">新增</button> <!-- 移到表格外部 -->
    <input type="text" v-model="searchTerm" class="form-control" placeholder="搜尋產品">

    <div class="table-frame">
    <table class="table table-hover">
      <thead>
        <tr class="text-center">
          <th scope="col">產品編號</th>
          <th scope="col">產品名稱</th>
          <th scope="col">價格(元)</th>
          <th scope="col">容量</th>
          <th scope="col">網路</th>
          <th scope="col">螢幕尺寸</th>
          <th scope="col">上架時間</th>
          <th scope="col">樣式</th>
          <th scope="col">修改</th>
          <th scope="col">下架</th>
          <th scope="col">刪除</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filteredProducts" :key="index" class="text-center" valign="middle">
          <td>{{ product.productId }}</td>
          <td>{{ product.productName }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.capacity }}</td>
          <td>{{ product.wifi }}</td>
          <td>{{ product.size }}</td>
          <td>{{ formatDate(product.setupDate) }}</td>

          <!-- <td>{{ formatDate(product.modifyDate) }}</td> -->
          <td>
            <button @click="redirectToSpec(product)">
              <i class="fas fa-list"></i>
            </button>
            <!-- <span>樣式</span> -->
          </td>

          <td>
            <button @click="openChangeModal(product)">
              <i class="fas fa-pen"></i>
            </button>
            <!-- <span>修改</span> -->
          </td>

          <td>
            <button v-if="product.salesStatus === 0" @click="changeSalesStatus(product.productId)">
              <i class="fas fa-check"></i>
            </button>
            <button v-else @click="changeSalesStatus(product.productId)">
              <i class="fas fa-xmark"></i>
            </button>
            <!-- <span v-if="product.salesStatus === 0">上架</span> -->
            <!-- <span v-else>下架</span> -->
          </td>

          <td>
            <button @click="deletedProduct(product)">
              <i class="fas fa-trash"></i>
            </button>
            <!-- <span>刪除</span> -->
          </td>


          <!-- <td><i class="fas fa-trash"></i></td> -->
        </tr>
      </tbody>
    </table>
  </div>


  </main>
  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="myModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">新增Pad</h5>
          <button type="button" class="close" aria-label="Close" @click="closeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="productId">產品編號:</label>
              <input type="text" class="form-control" id="productId" v-model="NewProduct.productId">
            </div>
            <div class="form-group">
              <label for="productName">產品名稱:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productName">
            </div>
            <div class="form-group">
              <label for="productDescription">產品特性:</label>
              <input type="textarea" class="form-control h-200" id="productDescription"
                v-model="NewProduct.productDescription">
            </div>
            <div class="form-group">
              <label for="price">價格(元):</label>
              <input type="text" class="form-control" id="price" v-model="NewProduct.price">
            </div>
            <div class="form-group">
              <label for="capacity">容量:</label>
              <input type="text" class="form-control" id="capacity" v-model="NewProduct.capacity">
            </div>
            <div class="form-group">
              <label for="wifi">wifi:</label>
              <input type="text" class="form-control" id="wifi" v-model="NewProduct.wifi">
            </div>
            <div class="form-group">
              <label for="size">螢幕尺寸:</label>
              <input type="text" class="form-control" id="size" v-model="NewProduct.size">
            </div>
            
            <div class="d-flex justify-content-end"> <!-- 新添加的 div -->
              <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              <button type="submit" class="btn btn-primary ml-2" @click="saveProduct">Save</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal" tabindex="-1" role="dialog" ref="changeModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">修改Pad內容</h5>
          <button type="button" class="close" aria-label="Close" @click="closeChangeModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="productId">產品編號:</label>
              <input type="text" class="form-control" id="productId" v-model="NewProduct.productId">
            </div>
            <div class="form-group">
              <label for="productName">產品名稱:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productName">
            </div>
            <div class="form-group">
              <label for="productName">產品特性:</label>
              <input type="text" class="form-control" id="productName" v-model="NewProduct.productDescription">
            </div>
            <div class="form-group">
              <label for="price">價格(元):</label>
              <input type="text" class="form-control" id="price" v-model="NewProduct.price">
            </div>
            <div class="form-group">
              <label for="capacity">容量:</label>
              <input type="text" class="form-control" id="capacity" v-model="NewProduct.capacity">
            </div>
            <div class="form-group">
              <label for="wifi">wifi:</label>
              <input type="text" class="form-control" id="wifi" v-model="NewProduct.wifi">
            </div>
            <div class="form-group">
              <label for="size">螢幕尺寸:</label>
              <input type="text" class="form-control" id="size" v-model="NewProduct.size">
            </div>
            
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-secondary" @click="closeChangeModal">Close</button>
              <button type="submit" class="btn btn-primary ml-2" @click="saveProduct">Save</button>
            </div>
          </form>
        </div>
        <div class="modal-footer">
        </div>
      </div>
    </div>
  </div>





</template>

<script>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const route = useRoute();
console.log(route)
import axios from 'axios';

import MyModal from './Test.vue'
import ChangeModal from './Test.vue'

export default {
  data() {
    return {
      products: [], // 将数据保存在数组中
      MyModal,
      ChangeModal,
      NewProduct: {
        productId: '',
        productName: '',
        productDescription: '',
        price: '',
        capacity: '',
        size: '',
        setupDate: '',
        modifyDate: '',
        wifi: '',
      },
      searchTerm: '',
      filteredProducts: [],


    };
  },
  watch: {
    searchTerm(newValue) {
      this.search();
    },
  },
  methods: {
    deletedProduct(product) {
      console.log();
      if (confirm("您確定要刪除這筆產品嗎？")) {
        axios.delete(`${this.API_URL}/products/deleteProduct?productId=${product.productId}`)
          .then(response => {
            this.products = this.products.filter(p => p !== product);
            console.log('刪除成功');
            this.$router.go();
          })
          .catch(error => {
            console.error('Error deleting product:', error);
          });

      }
    },

    redirectToSpec(product) {
      sessionStorage.setItem('productId', product.productId);
      sessionStorage.setItem('x', product.productId);
      sessionStorage.setItem('y', product.productName);
      sessionStorage.setItem('z', product.price);
      this.$router.push({
        path: 'Spec',
        query: {
          x: product.productId,
          y: product.productName,
          z: product.price
        }
      });
    },

    search() {
      // 根據搜索條件過濾產品列表
      if (this.searchTerm.trim() === '') {
        // 如果搜索條件為空，顯示所有產品
        this.filteredProducts = this.products;
        console.log('成功搜尋');
      } else {
        // 否則，過濾產品列表
        this.filteredProducts = this.products.filter(product =>
          product.productName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.price.toString().includes(this.searchTerm) ||
          product.size.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.productId.toString().includes(this.searchTerm)


        );

      }
    },
    saveProduct() {
      // 保存产品前先显示二次确认提示
      if (confirm("您確定要新增這筆產品嗎？")) {
        console.log('New Product:', this.NewProduct);

        axios.post(`${this.API_URL}/products/insertPad`, this.NewProduct)
          .then(response => {
            this.resetFormData(); // 清空表单数据
            console.log(response.data);
            this.fetchData();
            this.closeModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        // 如果用户取消保存操作，则不执行保存逻辑
        console.log('取消保存');
      }
    },
    saveChangeProduct() {
      // 保存产品前先显示二次确认提示
      if (confirm("您確定要保存這筆產品嗎？")) {
        console.log('New Product:', this.NewProduct);

        axios.put(`${this.API_URL}/products/updateProduct/${this.NewProduct.productId}`, this.NewProduct)
          .then(response => {
            this.resetFormData(); // 清空表单数据
            console.log(response.data);
            this.fetchData();
            this.closeModal();
          })
          .catch(error => {
            console.error('Error:', error);
          });
      } else {
        // 如果用户取消保存操作，则不执行保存逻辑
        console.log('取消保存');
      }
    },
    changeSalesStatus(productId) {
      if (confirm("您確定要更改這筆產品販售狀態嗎？")) { }
      axios.put(`${this.API_URL}/products/productSalesStatus?productId=${productId}`)
        .then(response => {
          console.log(response.data);
          // 成功上下架後重新載入資料，更新產品列表
          // this.fetchData();
          this.$router.go();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    resetFormData() {
      this.NewProduct = {
        productId: '',
        productName: '',
        productDescription: '',
        price: '',
        capacity: '',
        wifi: '',
      
      };
    },
    openModal() {
      this.$refs.myModal.classList.add('show');
      this.$refs.myModal.style.display = 'block';
      document.body.classList.add('modal-open');
    },
    closeModal() {
      this.$refs.myModal.classList.remove('show');
      this.$refs.myModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.resetFormData()
    },
    openChangeModal(product) {
      this.$refs.changeModal.classList.add('show');
      this.$refs.changeModal.style.display = 'block';
      document.body.classList.add('modal-open');
      product && (this.NewProduct = product);
    },
    closeChangeModal() {
      this.$refs.changeModal.classList.remove('show');
      this.$refs.changeModal.style.display = 'none';
      document.body.classList.remove('modal-open');
      this.resetFormData()
    },
    formatDate(dateTimeString) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        weekday: 'long',
      };
      const dateTime = new Date(dateTimeString);
      return dateTime.toLocaleString('zh-TW', options);
    }
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
         // alert('歡迎回來，管理者!!');
      } else {
       alert('權限不足');
        this.$router.push('/');
      }
    }
    axios.get(`${this.API_URL}/products/getProductByCategoryId?categoryId=C`)
      .then(response => {
        this.products = response.data;
        this.search();
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

  },
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
